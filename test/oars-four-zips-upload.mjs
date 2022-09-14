import { app } from './test-app.mjs'
import { appService, appNodeFiles } from '../src/lib/app-local.mjs'


describe("oars various sized zip uploads", () => {
  // Upload a file and return the response for verification.
  async function getFile(filename, file, contentType) {
    return app.service.upload(filename, {
      file,
      contentType
    }).then(appService.respJson)
  }

  // Expected response from a successful file upload to OARS.
  const fileSuccessResponse = {
    "STATUS_CODE": "546",
    "STATUS_MESSAGE": "File stored successfully",
    "STATUS_TYPE": "SUCCESS"
  }

  const options = { encoding: 'base64' }
  const contentType = 'application/zip'
  const assets = 'test/assets'

  it("upload 80268.zip file", async () => {
    const filename = '80268.zip'
    const file = await appNodeFiles.getFile(`${assets}/${filename}`, options)

    const x = await getFile(filename, file, contentType)
		expect(x).toEqual(fileSuccessResponse)
  })

  it("upload 80262.zip file", async () => {
    const filename = '80262.zip'
    const file = await appNodeFiles.getFile(`${assets}/${filename}`, options)

    const x = await getFile(filename, file, contentType)
		expect(x).toEqual(fileSuccessResponse)
  })

  it("upload 80129.zip file", async () => {
    const filename = '80129.zip'
    const file = await appNodeFiles.getFile(`${assets}/${filename}`, options)

    const x = await getFile(filename, file, contentType)
		expect(x).toEqual(fileSuccessResponse)
  })

  it("upload 76959.zip file", async () => {
    const filename = '76959.zip'
    const file = await appNodeFiles.getFile(`${assets}/${filename}`, options)

    const x = await getFile(filename, file, contentType)
		expect(x).toEqual(fileSuccessResponse)
  })


})
