import { app } from './test-app.mjs'
import { appService } from '../src/lib/app-local.mjs'

describe("oars file download", () => {
	const filename = 'test.txt'
	const apiOptions = {}

	/**
	 * Test download a file.
	 */
	it("download file", async () => {
		const result = await app.service.download(filename)
			.then(appService.respText)

		const value = 'Hello world!!!\nThis is a second line :)\nLets do a third, why not.\n'

		expect(result).toBe(value)
	})

	/**
	 * This is a place holder and has not be tested yet.
	 */
	xit("download file at path", async () => {
		const result = await app.service.download(filename, {
			getFileLocation: '/some/path'
		}).then(appService.respText)

		const value = 'Hello world!!!\nThis is a second line :)\nLets do a third, why not.\n'
		
		expect(result).toBe(value)
	})
})
