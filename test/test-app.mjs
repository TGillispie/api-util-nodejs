import { app } from '../src/app.mjs'
import { appService } from '../src/lib/app-local.mjs'

/**
 * Run some code after every request.
 *  - Show the results of every response.
 */
const r = app.service.request
app.service.request = (p, o) => r(p, o).then(async (resp) => {
  // Clone the response, the orignial stream can only be used once.
  // let rc = resp.clone()

  // Show the repsone results for all requests.
  // console.log(' -- respText: %o', await appService.respText(rc))
  // console.log(' -- respJson: %o', await appService.respJson(resp.clone()))

  return resp
})

export {
	app,
	appService
}
