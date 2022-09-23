import { app } from './test-app.mjs'
import { appService } from '../src/lib/app-local.mjs'


describe("oars file list", () => {
  const location = ''
  const apiOptions = {
  } 

	/**
	 * 
	 */
	xit("show file list", async () => {
		const result = await app.service('oars').list(location, apiOptions)
      .then(appService.respJson)
      
    const value = {
      "STATUS": "SUCCESS",
      "FILES": ["test.txt"]
    }

    expect(result).toEqual(value)
	})
})
