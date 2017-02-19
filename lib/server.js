import bodyParser from 'body-parser'
import express from 'express'
import manageViews from './manageViews'

function exoServer(serverConfig) {
	const { name, publicDir, viewsDir, viewsEngine, logger } = serverConfig;

	let app = express()
	app.appName = name;

	/* ==============================
	*	PARSE Json & Url Encoded
	============================== */
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	/* ==============================
	*	STATIC ASSETS : if publicDir set
	============================== */
	if (publicDir)
		app.use(express.static(publicDir))

	/* ==============================
	*	VIEWS : if viewsDir
	============================== */
	if (viewsDir) {
		try {
			manageViews(app, viewsDir, viewsEngine)
		}
		catch(err) {
			logger.error(err)
		}
	}

	return app;
} 


export default exoServer