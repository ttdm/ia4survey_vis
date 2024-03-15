# IA4Survey Visualizer

This repo contains a visualizer that dynamically displays data produced by the IA4survey project [(gh repo)](https://github.com/cfrancois7/ia4survey). The result is visible at [https://ttdm.github.io/ia4survey_vis](https://ttdm.github.io/ia4survey_vis).The main idea of the project is to improve the organization of public consultations by:

- Automating response processing through generative AI, significantly reducing consultation costs;
- Enhancing idea grouping through its automation;
- Increasing response clarity through dynamic result visualizations."
    


This project has been created for the Grenoble civic lab [https://grenoble.civiclab.eu/].


# Technical 
The project is based on react and has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Like every react app project, in the project directory, you can run:

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

### [additional command] `npm run deploy` 

Which deploy the React app to GitHub Pages. The homepage is specified in package.json l3. (It build the project locally and pushes the deploy repo into the gh-pages branch on github.)   

More informations on react app an [here](https://github.com/gitname/react-gh-pages).
