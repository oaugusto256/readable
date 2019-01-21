# readable

:scroll: Readable is the second React project made for the React Udacity Nanodegree program. I tried to mimic the Medium styles.

![alt text](https://github.com/tavioalves/readable/blob/master/src/images/readable.png)

## Live

You can use and access the project at: https://readable.surge.sh/

## How to use locally

Clone the repository to a folder of your choice, redirect to the cloned repository and execute the following command:

```javascript
yarn install
```
After the installation of the libs and dependencies, start the project executing the command:

```javascript
yarn start
```

Go the api-server folder, and run the api server

```javascript
node server
```

## Organization

The project is organized in the following way:

- src
  - components
  - containers
  - actions
  - images
  - reducers
  - index.js
  - index.scss

## Libs

Below we can see all the libs used in the project:

Name | Function
|:---:| :-----:|
axios | Client to execute HTTP requests
redux | Conteiner de estado previsível
redux-thunk | Middleware para requisições assincronas
react-redux | Ligação do React com Redux
react-router-dom | Criador de rotas
react-icons | Bunch of icons for react
react-spinners | Lib for loading spinners

## License

MIT © 2018

## Build tool

This project was created using the [Create React App](https://github.com/facebookincubator/create-react-app).
