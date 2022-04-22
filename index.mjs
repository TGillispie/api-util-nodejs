import { app } from './src/app.mjs' 
import { appService } from './src/lib/app-local.mjs'

// Leave a general message in the browser.
const msg = [
  "\n\t API Util: This program is a utility for testing APIs in",
  "**NodeJS** JavaScript.  See the example below (in index.mjs) for",
  "pragmatic use or run the provided test cases.  Tests for the",
  "provided APIs are included in the ./test folder.  Use `npm test`",
  "to run them.",
 
  "\n\tAdd new APIs to the src/service folder.",

  "\n\tWrite new Tests in the ./test folder.",

  "\n\tTwo similar version of this project are provided for their",
  "different use cases, and as a comparison between the subtle",
  "differences of JavaScript implementations.",
  "Browser: https://github.com/TGillispie/api-util-browser",
  "NodeJS: https://github.com/TGillispie/api-util-nodejs",

  "\n\t.env|config",
  "OARS_PATH: The base URL for OARS.",
  "OARS_KEY: The key used to access OARS.",
  "REQUEST_TYPE: A request library; fetch or axios.",
  "",
].join("\n")
console.log(msg)


// *** Begin Example: Quick and dirty app use.
app.service.download('test.txt')
  .then(resp => {
    // Clone response to leave the original response unchanged.
    const rc = resp.clone()

    // Convert the response body to text.
    appService.respText(rc)
      .then((text) => {
        // Show the response body.
        console.log("First 25 chars of results: %o", text.slice(0, 24))
        return text
      })

    // Always return the original response.
    return resp
  })
  .then(async resp => {
    const rc = resp.clone()
    const body = await appService.respJson(rc)

    // Display a subset of the response object.
    console.log('Response Subset: %o', {
      url: resp.url,
      body,
      headers: resp.headers,
      // status: resp.status,
      // statusText: resp.statusText,
      // type: resp.type,
      // ok: resp.ok,
    })

    // MDN Says: Promise Should Always Return...
    return resp
  })
// *** End Example
