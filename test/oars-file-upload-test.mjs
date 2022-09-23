import { app } from './test-app.mjs'
import { appService } from '../src/lib/app-local.mjs'
import { Buffer, Blob } from 'buffer'

import wavZipBase64 from './assets/wav-zip-base64.mjs'
import wavGzBase64 from './assets/wav-gz-base64.mjs'
import wavWavBase64 from './assets/wav-wav-base64.mjs'

describe("oars file-upload", () => {

  // 
  const fileSuccessResponse = {
    "STATUS_CODE": "546",
    "STATUS_MESSAGE": "File stored successfully",
    "STATUS_TYPE": "SUCCESS"
  }

	/**
	 * 
	 */
	it("upload a .json file", async () => {    
    const filename = 'test.json'
    const contentType = 'application/json'
    const file = new Blob([ JSON.stringify({
      testVar: 'my test var',
      importantObj: {
        temp: 68,
        location: '...test',
        modified: '...test'
      }
    }) ])

    const x = await app.service('oars').upload(filename, {file, contentType})
			.then(appService.respJson)

		expect(x).toEqual(fileSuccessResponse)
	})

	it("upload a .txt file", async () => {    
    const filename = 'test.txt'
    const contentType = 'text/plain'
    const aVar = 'Hello'
    const file = new Blob([ `${aVar}. This is a text file test.` ])

    const x = await app.service('oars').upload(filename, { file, contentType })
			.then(appService.respJson)
		
		expect(x).toEqual(fileSuccessResponse)
	})

  it("upload a .png file", async () => {    
    const filename = 'smile.png'
    const contentType = 'image/png'
    const file64 = 'iVBORw0KGgoAAAANSUhEUgAAABoAAAAiCAIAAADOAV5ZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFTSURBVEhL7ZSxjkVAFIY9gkfyAAq9RuEBKCV6hVYp0eq0io1aFJ5EVFrsH+dkMmSGsbvVzX6FXP+Z+dwc41j/POJ5nuM4fPNLgiDY970oCr43Icuyruvatg3DkKMDcr3TlWVJe0AURZxKLiDnd8iuqqo4Pbvk/A6dC73n9Mhx5cINOhdI01SZa/F9H6unaVLuIZ2pC+Acobt05UhCl38keLN1XV+O9A8RJ+4P2idcL16rDkOX0YAxdNEy9UTAIKEG2baN3hu61Dr6yPq+p9vHoytc4KqTP1hMujiOuaBBdoE8z7kAZJcAUt1BkwcMmOeZC0DpIsZxVBrFgAHrunIK0HuONcCIEX+Z8rKOIwIt5PgJ4QXbtlHIFpkkSYZhoPIreL8SSPF8XvgE/h1vu8F1XRPjqff3wPh1oPMuy8JLlWAF/zojvAL0t2kaLuvQ6T4Py/oG0EmD8FemAnMAAAAASUVORK5CYII='
		const file = new Blob(Buffer([ file64 ])) 
    
		const x = await app.service('oars').upload(filename, { file, contentType })
			.then(appService.respJson)
    
		expect(x).toEqual(fileSuccessResponse)
	})

  it("upload a .zip file", async () => {
    const filename = 'wav.zip'
    const contentType = 'application/zip'
		const file = new Blob(Buffer([ wavZipBase64 ])) 

    const x = await app.service('oars').upload(filename, { file, contentType })
			.then(appService.respJson)
		
		expect(x).toEqual(fileSuccessResponse)
  })

  it("upload a .gz file", async () => {
    const filename = 'wav.gz'
    const contentType = 'application/gzip'    
		const file = new Blob(Buffer([ wavGzBase64 ]))
    
    const x = await app.service('oars').upload(filename, { file, contentType })
			.then(appService.respJson)
		
		expect(x).toEqual(fileSuccessResponse)
  })

  it("upload a .wav file", async () => {
    const filename = 'wav.wav'
    const contentType = 'application/wav'
		const file = new Blob(Buffer([ wavWavBase64, 'base64' ]))
    
    const x = await app.service('oars').upload(filename, { file, contentType })
			.then(appService.respJson)
		
		expect(x).toEqual(fileSuccessResponse)
  })

})
