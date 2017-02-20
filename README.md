# Spacehorn

[![npm version](https://badge.fury.io/js/spacehorn.svg)](https://badge.fury.io/js/spacehorn)

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

## Spacehorn Configuration

#### publicDir
Specify a public directory for your assets.
```js
const Website = new Spacehorn({
  name: 'Awesome Website',
  publicDir: path.join(__dirname, 'public')
  ...
```

#### viewsDir
Just like publicDir, specify the directory where your views live.
```js
const Website = new Spacehorn({
  name: 'Awesome Website',
  viewsDir: path.join(__dirname, 'web', 'views')
  ...
```

#### viewsEngine
If you specify a `viewsDir`, `viewsEngine` will be required. 
It must be passed as a String declaring the templates extension. Or, as an Object with `ext` and `engineFunc`.

`ext`
It is the extension of your templates.

`engineFunc`
This is the function handler to manage any custom template engine. 

The `engineFunc` is not required if you are using any of the following engines in [this list.](https://github.com/expressjs/express/wiki?_ga=1.68461073.1262616189.1486618791#template-engines)
Spacehorn makes use of Express. Any engine that Express supports is ready to be used.

#### routes
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

#### middleware
Add middleware to be run before any request to your routes in array format.
```js
function isLoggedIn(drawer, req, res, next) {
  // Your logic	
  next()
}

const Website = new Spacehorn({
  name: 'Awesome Website',
  middleware: [
	isLoggedIn
  ],
  ...
```

#### db
Specify a database instance to be available within the drawer.

#### name
The name of the Spacehorn app. Used just for easy tracking of errors. Defaults to "Spacehorn App".

#### port
The port where the application will serve. Defaults to 3000.

#### logger
The custom logger to be used. Must handle `.log`, `.error`, `.warn`, `.info`. Defaults to common `console` logger.

#### security
Any Spacehorn app runs with some standard security rules by default. This can be modified to remove or add specific security features. *CREATING DOCS*

#### extendDrawer
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

*Documentation still in progress*