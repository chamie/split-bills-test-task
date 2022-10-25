# How the app works from the user's perspective
Main page is "Bills" that shows a list of the bills shared, each with a list of people (contacts) that share it with check-marks on those who've already paid off their debt, total sum of the bill, name and a date of its creation relative to Today.
To mark a person's debt as paid you just click on the checkbox, to modify other data of the bill, you need to click the "Edit" button first.
To create a new bill you open the "Contacts" page, select the peers involved from the list (add if necessary) and click "Create New Split Bill". The list will be created and you will be redirected to the list of bills. Newly created one will be active for editing the title and sum. Each person will be assigned their share (sum/(n+1), where n is the number of contacts on the list). Also you can see the total debt for each person right in the contacts list (that can be switched on and off with a "Show Details" checkbox).
The data is kept in the LocalStorage so it's not lost between the openings of the page and is also synced across tabs of the same browser. Besides that, the data could be exported to a file and imported back.
## Some details
On load the Redux store is populated from the localStorage, if any data has been already stored there.
The state is dumped into the LocalStorage on each change of the state, that's done with a global middleware `lsSyncMiddleware` defined in the store.ts.
Also the store is updated on each change of the LocalStorage, so you can change data in one tab/window of the browser and immediately see the UI updated in another one.
# Folder Structure:
```
├─ build                — here the production build goes
├─ public               — here the dev build goes
├─ src                  — here's the code
│  ├─app                — root Redux store stuff, root hooks
│  ├─components         — components, not tied to store. Include a component and, optionally, a test file and an SCSS file.
│  │ └─[Component.tsx, Component.test.tsx, Component.module.scss]
│  ├─features           — features, i.e. pieces of functionality that involve not only a component, but also a store slice and/or a route.
│  │ └─[Feature.tsx, Feature.test.tsx, featureSlice.ts, Feature.module.scss]
│  ├──services          — common place for services that do work not tied to reperesentational layer. E.g. import-export.
│  ├──utils             — common pieces of functionality too small to be a service.
│  ├──types             — common types. Each type in its own file.
│  ├──App.css           — app-level styles
│  ├──index.css         — top-level styles
│  ├──index.tsx         — top-level component
│  ├──index.css         — top-level styles
│  └──...
├──README.md            — this file
├──SplitBillsData.json  — demo data.
├──tsconfig.json        — TypeScript settings.
└──package.json         — npm package settings.
```

# Naming conventions
## Files
Components files start with capital, named same as the component inside.
Test files named same as the file they're testing but with `.test` before the extension (utils.ts → utils.test.ts).

## Variables and properties
Booleans start with a form of "to be", i.e. `isInputEnabled`, `shouldComponentUpdate` and never contain "not".

## Functions, including methods, reducers and thunks
Starts with a verb that describes the basic action done by the function.
Except for input handlers that wrap the actual action with event handling boilerplate — those might be called "on<EventName>".

# TODO
1. ~~Add file import-export.~~
2. ~~Add tests.~~
3. [NN]~~Make link to current page not an anchor.~~
4. ~~Normalize the use of the words `contact`, `person`, `people` — "There can be only one!"© the Highlander.~~
5. ~~Document project folder structure.~~
6. Add success message after import.
7. Improve error handling for import from file/LS (esp. on schema changes across versions).
8. Investigate the UX — do we need the Edit/Submit button? Looks like we don't. Also we need a better highlighting of the current list for the newly-created one, maybe consider adding some flashing-once animation or a fading-out THICCC border?

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
