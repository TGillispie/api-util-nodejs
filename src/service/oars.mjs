// NodeJS
import { Blob } from 'buffer'
import { Readable } from 'stream'

// 3rd Party + Ployfills
import { FormData } from  'formdata-node'

// App
import service from '../service/service.mjs'
import { appConversion } from '../lib/app-local.mjs'
import { appState } from '../state/global.mjs'

/**
 * Handle all OARS requests with custom OARS specific options.
 * 
 * @param {String} path 
 * @param {Object} options 
 * @returns {Promise}  Resolves to a Response object.
 */
const makeRequest = function(path, options) {
  return service.request(path, {
    headers: decorataeRequestHeader(options.headers),
    body: decorateRequestBody(options.body),
    method: options.method
  })
}

/**
* OARS Request Decorator which provides all redundant API setup.
*  Expect:
*    options.body is a FormData object.
*    All root object params are in upper snake case, or will be converted.
* 
* Adds the following FormData items:
*   1. key - pem key provided by OARS admin.
*   2. apiEnv - DEVELOPMENT, or other abstraction.
*   3. dbEnv - DEVELOPMENT, or other abstraction.
*   4. project - Specific project name.
* 
* @param {FormData} formData - see FormDataFactory
* @returns {FormData}
*/
const decorateRequestBody = async function(formData) {
  // getFiles requires user interaction, except for Chrome which might show a warning.
  // const key = await appFiles.getFile()
  // Key is hard coded for test automation.
  const key = new Blob([appState.oarsKey], { type: 'text/plain' })

  const common = {
    key: await key.text(),
    apiEnv: "DEVELOPMENT",
    dbEnv: "DEVELOPMENT",
    project: "demo",
  }
  Object.keys(common).forEach(id => 
    formData.append(id, common[id]))

  return formData
}

/**
 * Currently not used.  It's an example rec. for adding
 * the OARS pem key file via an HTTP header.  (It might be better
 * to use a token or other security mechanism with headers.)
 * 
 *    ```Authorizaton: Bearer [base64(key)]```
 * 
 * @param {Headers | Object} headers   Browser/Deno: Headers API,
 *   Nodejs: Object
 */
const decorataeRequestHeader = function(headers) {
  if (! headers) {
    return {}
  }

  // ToDo: Simplify this to use a standard object.
  typeof headers.append === 'function' // Browser support.
    ? headers.append('Authorization',
      `Bearer ${appConversion.encodeHeader(appState.pemCache)}`)
    : headers['Authorization'] =
      `Bearer ${appConversion.encodeHeader(appState.pemCache)}`

  return headers
}

/**
 * Instantiate a form-data object overriding the append method
 * to always user UPPER_SNAKE_CASE.
 * 
 * @param {Object} data Object of params to load FormData with. 
 * @returns {FormData} 
 */
const FormDataFactory = function(data) {
  const formData = new FormData()
  // Overload the FormData.append function to always use upper snake.
  // ToDo: I'd like a to overload append before instantiation of FormData.
  const _a = formData.append
  
  formData.append = (name, value, filename) => { 
    // Only convert names with lowercase characters.
    const parsedName = name.toUpperCase() != name
      ? appConversion.lowerCamelToUpperSnake(name)
      : name

    // Make sure formData runs in the corect context/this: (formData)
    // & proper signature (name, value) or, (name, value, filename)
    if (filename) {  
      return _a.apply(formData, [ // file signature
        parsedName,
        value,
        filename
      ])
    }
    return _a.apply(formData, [ // field signature
      parsedName,
      value
    ])
  }

  Object.keys(data).forEach(id => 
    formData.append(id, data[id]))

  return formData
}


// OARS Service Endpoints.


/**
 * Download a file.
 * 
 * @param {String} filename  name of file.
 * @param {Object} options  [getFileLocation, ]
 * @returns {Response}
 */
service.download = function (filename, options) {
  const path = `${appState.oarsPath}`
  const formData = FormDataFactory({
    ... options,
    filename,
    type: 'FILE',
  })

  return makeRequest(path, {
    method: 'POST',
    body: formData,
  })
}

/**
 * Upload a file.
 * 
 * @param {String} filename  Name of file. 
 * @param {Object} options  [getFileLocation, contentType, ]
 * @returns {Response}
 */
service.upload = async function (filename, options) {
  const path = `${appState.oarsPath}`
	
	// FormDataFactory converts parameters to UPPER_SNAKE for OARS.
  const formData = FormDataFactory({
    filename: filename,
    type: 'store',
  })
	formData.append('file', options.file, filename)

  return makeRequest(path, {
    method: 'post', 
    body: formData,
  })
}

/**
 * Get a directory listing.
 * 
 * @param {String} location 
 * @param {Object} options []
 * @returns {Response}
 */
service.list = function (location, options) {
  const path = `${appState.oarsPath}`
  const formData = FormDataFactory({
    ... options,
    type: 'NAMES',
  })

  if (location) {
    formData.append('getFileLocation', location)
  }

  return makeRequest(path, {
    method: 'post',
    body: formData,
  })
}

/**
 * Insert [data] records into a table.
 * 
 *    ** Lots of options here; 
 *    ** See the insert Test for all the required fields.
 * 
 * @param {String} table The name of the table to insert records into.
 * @param {Object} options [data, ]
 * @returns {Response}
 */
service.insert = function(table, options) {
  const path = `${appState.oarsPath}`
  const filename = 'magoo.glue.js'
	let rows = null // Table data, grouped by table.
  const meta = {
    HEADER: {} // Additional options
  }

  // Move [data] out of the options array.
  // Convert all nested options to upper snake.
  Object.entries(options).forEach(([id, val]) => {
    if (id == 'data') {
      rows = val
    } else {
      meta.HEADER[appConversion.lowerCamelToUpperSnake(id)] = val
    }
  })

  
  // ToDo: NodeJS: Readable ?= Browser|Deno: Blob
  // ToDo: Find a cross platform way to create file streams and blobs.
  const file = new Blob([
    JSON.stringify([meta, rows])
  ])

  // Build a FormData object.
  const formData = FormDataFactory({
    filename
  })

  // Add a file to the formData object.
  formData.append('file', file )

  return makeRequest(path, {
    body: formData,
    method: 'POST', 
  })
}

export {
  service
}
