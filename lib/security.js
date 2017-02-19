import cors from 'cors';
import helmet from 'helmet';

function securityGuard(app, rules) {
	const {
		cors: useCors,
		contentSecurityPolicy,
		dnsPrefetchControl,
		frameguard,
		hidePoweredBy,
		hpkp,
		hsts,
		ieNoOpen,
		noCache,
		noSniff,
		referrerPolicy,
		xssFilter
	} = rules;

	/* ========================
	* DNS Prefetch Control
	* Default - Prefetch Disabled (allow: false)
	=========================*/
	if (dnsPrefetchControl === undefined || dnsPrefetchControl)
		app.use(helmet.dnsPrefetchControl({ allow: false }))

	/* ========================
	* Hide Powered By
	* Default - Applied
	=========================*/
	if (hidePoweredBy === undefined || hidePoweredBy)
		app.use(helmet.hidePoweredBy())

	/* ========================
	* IE No Open
	* Default - Applied
	=========================*/
	if (ieNoOpen === undefined || ieNoOpen)
		app.use(helmet.ieNoOpen())

	/* ========================
	* No Sniff
	* Default - Applied
	=========================*/
	if (noSniff === undefined || noSniff)
		app.use(helmet.noSniff())

	/* ========================
	* XSS Filter
	* Default - Applied
	=========================*/
	if (xssFilter === undefined || xssFilter)
		app.use(helmet.xssFilter())

	/* ========================
	* Content Security Policy
	* Default - Not applied
	=========================*/
	if (useCors)
		app.use(cors())

	/* ========================
	* Content Security Policy
	* Default - Not applied
	=========================*/
	if (contentSecurityPolicy)
		app.use(helmet.contentSecurityPolicy(contentSecurityPolicy))

	/* ========================
	* Frameguard
	* Default - Not applied
	=========================*/
	if (frameguard)
		app.use(helmet.frameguard(frameguard))

	/* ========================
	* HTTP Public Key Pinning
	* Default - Not applied
	=========================*/
	if (hpkp)
		app.use(helmet.hpkp(hpkp))

	/* ========================
	* Strict Transport Security
	* Default - Not applied
	=========================*/
	if (hsts)
		app.use(helmet.hsts(hsts))

	/* ========================
	* No Cache
	* Default - Not applied
	=========================*/
	if (noCache)
		app.use(helmet.noCache())

	/* ========================
	* Referrer Policy
	* Default - Not applied
	=========================*/
	if (referrerPolicy)
		app.use(helmet.referrerPolicy(referrerPolicy))

}

export default securityGuard
