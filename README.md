# TODO
1. ~~Add file import-export.~~
2. ~~Add tests.~~
3. [NN]~~Make link to current page not an anchor.~~
4. ~~Normalize the use of the words `contact`, `person`, `people` — "There can be only one!"© the Highlander.~~
5. Document project folder structure.
6. Add success message after import.
7. Error handling for import from file/LS (esp. on schema changes across versions).

# Sample data
Can be found in [SplitBillsData.json](SplitBillsData.json) file. It can be imported using the Import/Export of the app.

# Demo deployment
Is deployed [here](http://чами.рф/vacuum/).
Deployed manually for the moment, by running the `npm run build` task, modifying the absolute links in `index.html` to relative ones and uploading the `build` folder via FTP.
For actual production development the process would be modified to use some kind of CI/CD depending on the staging platform involved.

# Basis
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.
CRA info below:
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
