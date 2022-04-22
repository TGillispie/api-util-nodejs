import { app, appService } from './test-app.mjs'

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
