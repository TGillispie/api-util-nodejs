import { appState } from '../state/global.mjs'
import { Buffer, Blob } from 'node:buffer'
import { readFile } from 'node:fs/promises'

/**
 * Service helpers, and some file conversion.
 */
const appService = {
  /**
   * Get the response body as Text.
   *
   * @param {Response} response
   * @returns {String}
   */
  respText: (response) => {
    if (! response.text) {    // Axios support.
      return response.data
    }
    return response.text()    // fetch support
  },

  /**
   * Get the response body as JSON.
   * @param {Response} response
   * @returns {Object}
   */
  respJson: (response) => {
    // Try Axios support
    if (! response.json) {
      return JSON.parse(response.data)
    }

    // Try fetch support
    return response.json()
  },
}

/**
 * Some basic string conversion functions.
 */
const appConversion =  {
  lowerCamelToUpperSnake(string) {
    return string.split(/(?=[A-Z])/).join('_').toUpperCase()
  },
  escapeNewLine: function (string) {
    return string.replace(/[\r][\n]/g, '\\r\\n')
  },
  unEscapeNewLine: function (string) {
    return string.replace(/\\r\\n/g, "\r\n")
  },
  encodeHeader: function (string) {
    return btoa(string) // base64 encode.
  }
}

/**
 * Working with files in the browser.
 *  (Uses an IIFE to hide private functions.)
 */
const appFiles = (function() {
  /**
   * Open a file selection dialog for a user.
   *
   * Generally the user must activate the input button for security
   * reasons.  Create a button that fires off this input's click event
   * if necessary.
   *
   * Chrome seems to let the click fire with a warning when initiated from
   * the console.
   *
   * @param {*} handleFile
   */
  const selectFile = function (handleFile) {
    const t = document.createElement('input')
    t.type = 'file'
    t.addEventListener('change', handleFile, false)
    t.click()
  }

  /**
   * Open select file dialog in browser.  Return the first selected file.
   * (For pragmatic file dialog notes see: selectFile.)
   *
   * @returns Blob|File
   */
  const getFile = () => {
    return new Promise((resolve, rej) => {
      selectFile(async function (e) {
        // file has size, name, type and other properties.
        const file = this.files[0]
        // Store file in local state.
        appState.file = await file.text()
        resolve(file)
      })
    })
  }

  return { getFile }
})()

/**
 * Working with NodeJS Files.
 */
const appNodeFiles = (function() {
  /**
   * @param {*} handleFile
   */
  const selectFile = function (handleFile) {
  }

  /**
   * Load a file from the file system.  Accept file open prperties.
	 *
	 * @param path  String  The path of a file to load.
	 * @param props  Object  Read file operation properties: encoding, etc.
   * @returns  Blob|File  Return file contents.
   */
  const getFile = async (path, props = null) => {
		const buf = readFile(path, props)
		const contents = new Blob([buf])
		return contents
	}

  return { getFile }
})()



/**
 * Some browser hacks and macros.  None are being used for this
 * projects API tests.
 */
const appMisc = {
  /**
   * Fetch an attachment from a web email client.  (Browser)
   * (Must be run from within the web clients domain.)
   *
   * @returns File as text.
   */
  setPem: function () {
    return fetch(appState.emailAttchmentUrl)
    .then(async resp => {
      appState.pem = await resp.text()
    })
  },

  /**
   * Load and inject a JavaScript file from server into a browser.
   *
   *  - Load this file into console -
   * Update the URL and then either call or paste the following IIFE in
   * a browser console.
   */
  appendScript: function() {
    ((url = 'http://localhost:8080/api-util.js') => {
      const r = document.getElementById('api-util')
      r && document.body.removeChild(r)

      const s = document.createElement('script')
      s.type = 'module'
      s.id = 'api-util'
      s.src = url
      // s.text = res   // If using fetch.
      document.body.appendChild(s)
    })()
  },
}

export {
  // File Support
	appFiles,
	appNodeFiles,

	// String Manipulation
  appConversion,

	// HTTP Helpers
  appService,

	// Misc.
  appMisc
}
