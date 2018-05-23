# Articles Renderer

## Installation

We recommend using the latest version of Node, currently version 10.

```
git clone
npm install
```

To run this application locally, run this
```
npm start
```
It will open the application on [http://localhost:3000](http://localhost:3000)

## Tests 
```
npm test
```

## FYI
We're using Razzle - it abstracts away two webpack configs, one for the server and the other for the client.

## Local setup

**Using Visual Studio Code editor**
You can install the ESLint extension
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
This will pick up the eslint settings you have in the `.eslintrc` file. 

However, we need to tell VS Code that `.jsx` files are React. To do this:
- Open a `.jsx` file in the project. 
- On the bottom right of the editor, you’ll see `JSX` as the detected filetype. Click on this. 
- Select `Configure File Association for ‘.jsx’` on the drop-down menu. Then select `JavaScript React`. 
- You should now see all the lint errors in the editor. 
