import { ROUTES_IS_NOT_ARRAY } from './messages/error'

function router(app, exoDrawer, routes){

	if (routes.constructor === Array) {

		for (let i = 0; i < routes.length; i++) {
			const route = routes[i]
			const { path, view, exec } = route
			let { method } = route

			method = method.toLowerCase()

			let drawer = { ...exoDrawer, method, path, view }

			app[method](path, (req, res) => {
				let params = { ...req.params, ...req.body, ...req.query }

				drawer.params = params
				drawer.render = res.render
				drawer.send = res.send
				drawer.sendJson = res.json

				exec(drawer, req, res)
			})
		}

	}
	else {
		throw new Error(ROUTES_IS_NOT_ARRAY(app.appName, routes.constructor.name))
	}

}


export default router;
