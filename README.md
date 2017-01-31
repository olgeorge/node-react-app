# Node, Webpack, Babel, React, MaterialUI demo

Back-end is a Node micro-service which exposes a POST sendMessage api for storing and sending a message to a stub of an external notification service.

Message schema:
* id string - generated on save;
* recipients []string - a list of recipient ids;
* subject string - message subject;
* body string - message body;

Front-end is a React app that collects the user input using MaterialUI components and sends it to the server with Axios.

## Installation

```shell
cd src
npm i
```

## Isage

```shell
npm start
```

## License

The files included in this repository are licensed under the MIT license.
