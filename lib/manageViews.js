import { VIEWS_ENGINE_NEEDED, INCOMPLETE_TEMPLATE_ENGINE } from './messages/error'

function manageViews(app, viewsDir, viewsEngine) {

	if (!viewsEngine) {
		throw new Error(VIEWS_ENGINE_NEEDED(app.appName))
	}
	else {

		app.set('views', viewsDir)

		if (viewsEngine.constructor === String)
			app.set('view engine', viewsEngine)

		if (viewsEngine.constructor === Object) {
			const { ext, engineFunc } = viewsEngine

			if (!ext || !engineFunc) {
				throw new Error(INCOMPLETE_TEMPLATE_ENGINE(app.appName))
			}
			else {
				app.engine(ext, engineFunc)
				app.set('view engine', viewsEngine)
			}
		}
		
	}

}

export default manageViews
