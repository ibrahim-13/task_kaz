# URL Shortener

* [How to build and run](#how-to-build-and-run)
  * [Docker Compose](#docker-compose)
  * [Docker](#docker)
* [Technology](#technology)
* [API](#api)

---

_The server runs on __port 80__. But __Docker__ exposes the access to the server at the port __port 8080__. So, the entry point to the server becomes __localhost:8080__ / __127.0.0.1:8080___

---

> All the docker commands bellow assumes that you are on the root directory of the project, where this file is located.

> Docker version **17.05** or greater is needed, as the it uses multi-stage building process.

---

## `How to build and run`

### __`Docker Compose`__

_To start the server:_
```sh
docker-compose up
```

_To stop the server:_
```sh
docker-compose down
```

### __`Docker`__

_Build image:_
```sh
docker build -t ibrahim/shortener:1.0.0 .
```

_Run the container:_
```sh
docker run --name url_shortener_app -p 8080:80 ibrahim/shortener:1.0.0
```

_Stop the container_
```sh
docker stop url_shortener_app
```

---

## `Technology`
* Backend
  * Runtime: Node.js
  * Express.js
  * TypeScript
* Frontend
  * React.js
  * TypeScript

---

## `API`

| URL Path | Parameter | Formatting | Returns | Example |
| --- | --- | --- | --- | --- |
| /shorten | url | URL Encoded | URL if succeeded, otherwise Error Message | /shorten?url=http://google.com |
| /original | url | URL Encoded | URL if succeeded, otherwise Error Message | /original?url=http://localhost/x0 |