import dotenv from 'dotenv'
// Add .env file params to process global.
dotenv.config()

/**
 * Generic Data Model
 */
const appState = {
  requestType: `${process.env.REQUEST_TYPE}`,
  file: null,
  // Misc. method for loading a file attachement.
  // emailAttchmentUrl: '',

  // API Parameters
  // OARS
  oarsPath: `${process.env.OARS_PATH}`,
  oarsKey: `${process.env.OARS_KEY}`,
}

export { appState }
