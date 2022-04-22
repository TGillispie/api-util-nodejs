// 3rd Party + Ployfills
import axios from 'axios'
import fetch from 'node-fetch'

// App
import { data } from '../state/global.mjs'

/**
 * Common service object used by all API services.
 */
const service = {}

/**
 * Setup the default request function.  Both Axios and Fetch
 * are provided for making requests.
 * 
 * Config requestType is either AXIOS, or FETCH.
 * default: FETCH
 */
service.request = (data.requestType.toUpperCase() === 'AXIOS')
  ? async function(path, options) {
    // Awaiting nodeJS: looks like FormData turns into a promise. streams!?
    const body = await options.body
    return axios({
      url: path,
      method: options.method,
      data: body,
      headers: options.headers,
    })
  }
  : async function (path, options) {
    // Awaiting nodeJS: looks like FormData turns into a promise. streams!?
    const body = await options.body
    return fetch(path, { ...options, body })
  }

export default service
