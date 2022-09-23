// App
import { service as OarsService } from './service/oars.mjs'

// Configure App
const app = {
	services: {
		oars: OarsService
	},

	/** Select a service. **/
	service: (api) => {
		return app.services[api]
	}
}


export { app }

