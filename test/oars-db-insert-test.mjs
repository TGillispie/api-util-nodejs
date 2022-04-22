import { app, appService } from './test-app.mjs'

describe("oars db insert", () => {
	let pk = 22204
	const table = 'OD_INVENTORY'
	const apiOptions = {
		project: 'MY_PROJECT',
		application: 'OARS_DEMO_CS',
		schema: 'OARS_DEMO',
		tableCount: 1,
		version: '1.0',
		postItemId: 'ID',
		postItemValue: pk,

		// List of Tables.
		tableList: [{
			TABLE: table,
			ROW_COUNT: 1
		}],

		// Table Rows,
		data: {
			[table]: [{
				ID: pk,
				NAME: "TurtleTestUtil",
				QUANTITY: 42,
				PRICE: 12.12,
			}],
		}
	}

	/**
	 * This is difficult to test:
	 *  1. It's a database insert operation and an integration test.
	 * 	2. primary key is required.
	 *  3. sanity check is required.
	 *  4. no way to delete a record w/ primary key via API.
	 */
	it("insert records", async () => {
		const result = await app.service.insert(table, apiOptions)
			.then(appService.respJson)

		const value = {
			"STATUS_CODE": "504",
			"STATUS_MESSAGE": "File processed successfully",
			"STATUS_TYPE": "SUCCESS"
		}

		expect(result).toEqual(value)
	})

	/**
	 * 
	 */
	it("show an error", async () => {
    pk = pk + 1
		delete apiOptions.project
    const result = await app.service.insert(table, apiOptions)
      .then(appService.respJson)

		// const value = {
    //   "TYPE": "PHP Error",
    //   "CODE": 8,
    //   "MESSAGE": "Undefined index: FILENAME",
    //   "FILE": "\\/var\\/www\\/html\\/oars\\/dev\\/application\\/controllers\\/Oars.php",
    //   "LINE": 242
    // }
    const value = {
      "TYPE": "PHP Error",
      "CODE": 8,
      "MESSAGE": "Undefined property: stdClass::$PROJECT",
      "FILE": "\/var\/www\/html\/oars\/dev\/application\/models\/Oars_model.php",
      "LINE": 48
    }

		expect(result).toEqual(value)
	})
})
