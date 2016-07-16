## Project structure
```
|
|---[src]---|
|           |---[client]: source code for client  
|           |
|           |---[server]: source code for api
|
|---config.json: configurations
|
|---gulpfile.js: build process file for server source code
|
|---webpack.config.js: build process file for client source code
|
```

```
|
|---[client]----|
|               |---[components]: checkout, payment ... components
|               |
|               |---[container]: redux connect component
|               |
|               |---[reducers]: redux reducer
|               |
|               |---[styles]: styles for whole client project
|               |
|               |---index.html: index page
|               |
|               |---index.js: enter point for whole client project
|               |
|               |---storage.js: CRUD method base on localStorage
```

```
|
|---[server]----|
|               |---[routes]: router layer
|               |
|               |---[service]: service layer
|               |
|               |---app.js: express server
|               |
|               |---config.js: whole config property for whole server api project
|               |
|               |---index.js: express server startup entry
```

## Set Up

*before set up, you need change the `config.json` to you own configurations, such as server config and authentication config, after this you can do below steps:*

1. You need install `node` (** precondition **)
2. You need install `npm` (** precondition **)
3. run `npm install`
4. run `npm run build:client`
5. run `npm run build:server`
6. run `npm run start`
7. open the link `http://localhost:3000`

## Technical structure:

* client side: React + Redux + Redux thunk
* server side: express

## Steps I resolve the problems:
First I review the whole docs and example on PayOn. I don't understand clear for the first glance. So I review them again and again. I thought it is easy, that is if I found a API that we can post the amount, currency, card number, holder, cvv, the problem is resolved and there is a such api indeed, but I can't use it, because first I can't use it in front end side directly, because there are some issue with cross origin, second use it at the backend? but I need send the encrypted sensitive data, that is much hard, so I give up this solution.

Luckily  there is a payment widget I can use, so I start to implement it with react and just want to wrap it with react component. the only problem for this widget is after we payment succeed, the whole page will refreshed, oh no, that is no what I want, finally I found a important config `useSummaryPage` to stop the page refresh. Finally I implement all requirements

But I want to say, we can do much better for the payment widget. because it expose some globals, that is very painful.
