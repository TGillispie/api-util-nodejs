import { app } from './test-app.mjs'
import { appService } from '../src/lib/app-local.mjs'


exit;

describe("oars file list", () => {
  const location = ''
  const apiOptions = {
  } 

	/**
	 * 
	 */
	it("show file list", async () => {
		const result = await app.service.list(location, apiOptions)
      .then(appService.respJson)
      
    const value = {
      "STATUS": "SUCCESS",
      "FILES": ["test.txt"]
    }

    expect(result).toEqual(value)
	})
})
