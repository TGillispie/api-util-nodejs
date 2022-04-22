import { app, appService } from './test-app.mjs'

describe("oars file upload", () => {
  const filename = 'test.json'
  const contentType = 'application/json'
  // ToDo: Should probably be Readable stream, Blob or similar.
  const file = JSON.stringify({
    testVar: 'my test var',
    importantObj: {
      temp: 68,
      location: '...test',
      modified: '...test'
    }
  })

	/**
	 * 
	 */
	it("upload file", async () => {    
    const result = await app.service.upload(filename, {
      file,
      contentType
    }).then(appService.respJson)

    const value = {
      "STATUS_CODE": "546",
      "STATUS_MESSAGE": "File stored successfully",
      "STATUS_TYPE": "SUCCESS"
    }

		expect(result).toEqual(value)
	})
})
