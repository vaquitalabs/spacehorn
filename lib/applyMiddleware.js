import { MIDDLEWARE_NOT_ARRAY } from './messages/error'

function applyMiddleware(app, drawer, middleware) {
	if (middleware.constructor === Array) {
		for (let i = 0; i < middleware.length; i++) {
			server.use((req, res, next) => {
				middleware[i](drawer, req, res, next)
			})
		}
	}
	else {
		throw new Error(MIDDLEWARE_NOT_ARRAY(app.appName))
	}
}

export default applyMiddleware
