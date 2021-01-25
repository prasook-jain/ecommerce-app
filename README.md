# Getting Started with Create React App

Node Version: `v10.22.1`

Yarn Version: `1.22.5`

NPM Version: `6.14.6`

## Project Description:

### Structure

This App have mainly 3 Pages:

- Home Page -> `/` -> which display `Header`, `Content` and `CartSidebar` components
- Checkout Page -> `/checkout` -> which display `Header`, `Checkout` components
- Login Page -> `/login` -> which display only `Login` components

Initial data is fetch using saga on `App` component is mount. Which fetches users,\
info as well as set cart & user details from localStorage if present, else set \
to defaults.

To avoid extra renders on unrelated component when redux state using `reselect`. \
Mostly tried to use React hooks, at multiplace instance of `CategorySection` we \
have to use `connect` HOC, to generate create different instances of \
`categoryItemsSelector`.

Added tests for `CartItem` component in `CategorySection`.

All other mentioned requirement's are implemented.

### Login Details:

```
username: demo_user
password: password
```

## Available Scripts

In the project directory, you can run:

### `yarn`

To install packages.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
App is built using [create-react-app](https://create-react-app.dev/),
