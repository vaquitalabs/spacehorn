# Spacehorn

[![npm version](https://badge.fury.io/js/spacehorn.svg)](https://badge.fury.io/js/spacehorn)
[![Build Status](https://travis-ci.org/vaquitalabs/spacehorn.svg?branch=master)](https://travis-ci.org/vaquitalabs/spacehorn)
[![Coverage Status](https://coveralls.io/repos/github/vaquitalabs/spacehorn/badge.svg?branch=master)](https://coveralls.io/github/vaquitalabs/spacehorn?branch=master)

NodeJS framework to build any website or api with total control and without limiting practices.

## Features

- Start a new Website or API quickly and easy
- It is just a tool. It is NOT an opinionated framework that forces you to do things in some specific way
- Built in top of Express. If you already know Express, using Spacehorn will be a breeze

## Install Spacehorn

With npm:
```bash
$ npm install spacehorn
```

With yarn:
```bash
$ yarn add spacehorn
```

## Quick start example (Hello World)

This example mounts a simple server that listens on the default port `3000`

```js
const Website = new Spacehorn({
  name: 'Awesome Website',
  routes: [
    {
      path: '/',
      method: 'get',
      exec(drawer, req, res){
        res.send('Hello World')
      }
    }
  ]
});

Website.attend();
```

After running your application, you will see in your terminal the following:
```bash
----------------------------------------
Awesome Website is serving on port 3000
```

Then you can go to localhost:3000 and see "Hello World" being printed.

## CLI 
Spacehorn has some CLI commands to easily create and start a new application.

Install it globally on your system:
```bash
$ npm i -g spacehorn
```

You can:
```bash
### Create a new scaffold for an API with PostgreSQL
spacehorn --arch psql-api
yarn (or npm install)
npm start (A ready server will start listening with a demo endpoint "localhost:3000/status")

### Create controllers
cd app/controllers
spacehorn -c users (new dir "users" with controller files for all http verbs is created)

spacehorn -c users -n QueryUsers (creates a QueryUsers.js controller inside "users" dir)

spacehorn -c cars -n NewCar (new dir "cars" with a single NewCar.js controller)
```


## Spacehorn Configuration

### publicDir
Specify a public directory for your assets.
```js
const Website = new Spacehorn({
  name: 'Awesome Website',
  publicDir: path.join(__dirname, 'public')
  ...
```

### viewsDir
Just like publicDir, specify the directory where your views live.
```js
const Website = new Spacehorn({
  name: 'Awesome Website',
  viewsDir: path.join(__dirname, 'web', 'views')
  ...
```

### viewsEngine
If you specify a `viewsDir`, `viewsEngine` will be required. 
It must be passed as a String declaring the templates extension. Or, as an Object with `ext` and `engineFunc`.

`ext`
It is the extension of your templates.

`engineFunc`
This is the function handler to manage any custom template engine. 

The `engineFunc` is not required if you are using any of the following engines in [this list.](https://github.com/expressjs/express/wiki?_ga=1.68461073.1262616189.1486618791#template-engines)
Spacehorn makes use of Express. Any engine that Express supports is ready to be used.

### routes
This are the routes you want to set for your application passed as an array.
Each route in format:
```js
{
  method: String (one of 'get', 'post', 'put', 'delete')
  path: String (the path of the route, e.g: '/about')
  view: String (the view to be used taken from the specified viewsDir. E.g: 'about')
  exec: Function(drawer, req, res)
}
```

The `exec` function params available are the `drawer`, the `request` and `response`.

The `drawer`:
It is meant to be a toolset that comes with the `method`, `path` and `view` of the route. It has all the params (path params, query, body) in a single `params` key. And also, comes with an `http` util to be used. (There is more about the `drawer.http` below).
If you specify a Database instance, you can access it as well with `drawer.db`.

In short, you can make use of the different drawer parts like...
`const { http, method, path, view, params } = drawer;`

### middleware
Add middleware to be run before any request to your routes in array format.

For each middleware, it is possible to pass a function or an object specifying the path and function to run.
```js
function isLoggedIn(drawer, req, res, next) {
  // Your logic	
  next()
}

const verifyIsAdmin = {
  path: '/admin',
  run(drawer, req, res, next) {
    // Your logic
    next()
  }
}

const Website = new Spacehorn({
  name: 'Awesome Website',
  middleware: [
	isLoggedIn,
  verifyIsAdmin
  ],
  ...
```

### db
Specify a database instance to be available within the drawer.

### name
The name of the Spacehorn app. Used just for easy tracking of errors. Defaults to "Spacehorn App".

### port
The port where the application will serve. Defaults to 3000.

### logger
The custom logger to be used. Must handle `.log`, `.error`, `.warn`, `.info`. Defaults to common `console` logger.

### httpRequestsLog
Every HTTP request is showed on the console by default. It can be disabled with `httpRequestsLog: false`.

### trustProxies
If your application is behind a proxy, set the trust on the proxy(proxies) in array format. E.g: `trustProxies: ['127.0.0.1', ...]`

### extendDrawer
If there is anything else you want to have in the drawer for future use on your routes, you can add it in here.
```js
const Website = new Spacehorn({
  name: 'Awesome Website',
  extendDrawer: {
    anotherDB: anotherDBConnection,
    someKeys: {}
  }
  ...
```

On route exec:
```js
  exec(drawer, req, res) {
  	const { anotherDB, params } = drawer

  	anotherDB.query('any query')
  	.then()
  	...
  }
```

### security
Any Spacehorn app runs with some standard security rules by default. This can be modified to remove or add specific security features.
```js
  security: {
    cors: true,
    frameguard: true,
    ...
  }
```

#### cors (Boolean)
Disabled by default. To enable CORS(Cross-Origin Resource Sharing) just set 'cors: true'

#### contentSecurityPolicy (Boolean)
Disabled by default. If you want to enable the Content-Security-Policy header set `contentSecurityPolicy: true`

#### dnsPrefetchControl (Boolean)
Prefetch control is enabled by default. If you want to disable the dns prefetch control set `dnsPrefetchControl: false`

#### frameguard (Boolean)
Disabled by default. If you want to add the X-Frame-Options header set `frameguard: true`

#### hidePoweredBy (Boolean)
Enabled by default. If you want the X-Powered-By header set `hidePoweredBy: false`

#### hpkp (Boolean)
Disabled by default. To set the Public-Key-Pins header add `hpkp: true`

#### hsts (Boolean)
Disabled by default. To set the Strict-Transport-Security header add `hsts: true`

#### ieNoOpen (Boolean)
Enabled by default. To disable the X-Download-Options header set `ieNoOpen: false`

#### noCache (Boolean)
Disabled by default. To enable the `nocache` middleware, set `noCache: true`

#### noSniff (Boolean)
Enabled by default. To disable the X-Content-Type-Options nosniff header set `noSniff: false`

#### referrerPolicy (Boolean)
Disabled by default. Set the Referrer-Policy: no-referrer header adding `referrerPolicy: true`

#### xssFilter (Boolean)
Enabled by default. Disable the X-XSS-Protection header with `xssFilter: false`

