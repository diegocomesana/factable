<p align="center"><img src="misc/logo.svg" alt="Factable Logo" width="200"/></p>

# Factable

A test case generation and managment tool for nodejs babel transpiled projects.

## What is Factable?

Factable intercepts your runtime function calls, lets you visualize and define your relevant test cases and then writes tests for them.

Even if you dont't care about test generation, Factable is a great tool to be aware of what's really happening with your functions.

## Why?

Have you ever found yourself running your app and logging your function call inputs and outputs just to use them for your test mocks and assertions?

Have you ever wanted a way to register your runtime function calls to help you build your tests?

We are lazy. Every time we find ourselves doing stuff that could be automated or at least assisted, we go for it. Thats why Factable exists.

## How does it work?

First, your function body is wrapped (at transpiling time) through a babel plugin that registers all relevant runtime information.

Then, that information is sent to a local server which serves it to the browser, where the client UI resides.

Lastly, UI client connects to the server through websockets to manage user interaction.

**_Factable Server_** can register function calls and write and erase test files.

Factable saves its state in "factable.json" file in the root of your project. Every test written is saved there. You should include it in your git tracked files.

## Facts about Factable

- Factable helps you understand your functions better.
- Factable pretends to help you build tests as soon as possible.
- Factable likes and promotes **_TDD_** and **_BDD_**.
- Factable loves **_Funcional Programming_** (pure functions, inmutability) and aims to be a tool that promotes its best practices and increases awareness about its benefits.
- Factable **_tests are not perfect and will not always pass_**: It's up to you to make them work and pass! There are many cases (examples later) where factable can't build your function call, but it is still very usefull as it takes care of all the boilerplate. For now, you can freely manually edit and fix test files, just remember not to 'Edit' or 'Discard' it from Factable UI
- Factable is intended to be used with **Git**: we write, update, and also eventually delete test files, so we rely on git for recovering any previous file state.
- Factable only captures function calls server-side. Client-side is still a work in progress.
- Remember **Factable** is just a **dev-tool** and should only be used in your **_development_** process. Please don't use it in your **production** builds!

---

<br />

## Quick start

1. Install factable as dev dependency:

```
npm install -D factable
```

2. Add factable babel plugin to your current babel config:

   **_.babelrc_**:

   <pre lang="...">
   {
       "presets": [
           [
               "@babel/preset-env"
           ]
       ],
       "plugins": [
           <b>"module:factable"</b> // new
       ]
   }
   </pre>

   > Notice "_module:_" prefix is required

   or to **_babel.config.js_**:

    <pre lang="js">
    <b>const factablePlugin = require("factable");</b> // new
   
    module.exports = function (api) {
        api.cache(true);
        const presets = ["@babel/preset-env"];
        <b>const plugins = [factablePlugin];</b> // new
    
        return {
            presets,
            plugins,
        };
    };
    </pre>

3. Add Factable to your scripts:

   > Remember **Factable** is just a **dev-tool** and should only be used in your **_development_** process.
   >
   > Please don't use it in your **production** builds!

   - Set env variable **_FACTABLE_TRANSPILE={PORT}_** in every development (babel related) build script:

   **_package.json_**

   <pre lang="...">
   "scripts": {
   
       "dev": "babel-node ./src",
       <b>"dev:factable": "cross-env FACTABLE_TRANSPILE=8888 babel-node ./src",</b> // new
   
   },
   </pre>

   or:

   <pre lang="...">
   "scripts": {
   
       "build": "babel -d ./build ./src",
       <b>"build:factable": "cross-env FACTABLE_TRANSPILE=8888 babel -d ./build ./src",</b> // new
   
   },
   </pre>

   > `FACTABLE_TRANSPILE=8888` tells factable to transpile and set **_Factable Server_** port to `8888`.

   - Add a script to start **_Factable Server_**:

   **_package.json_**

   <pre lang="...">
   "scripts": {
   
       <b>"factable": "factable-server-run 8888</b>",
   
   },
   </pre>

   > `factable-server-run 8888` is the cli command that launches **_Factable Server_** on port `8888`
   > Make sure to put the same port value in both build and **_Factable Server_** scripts.

4. Add factable comment at the top of any file where you want Factable to intercept function calls:

<pre lang="js">
// FACTABLE

export const someFancyFunc = () => {

}
</pre>

5. Start **_Factable Server_**:

   ```
   npm run factable
   ```

   > This will launch a browser window with the UI.

6. Run your app with Factable flag:

   ```
   npm run dev:factable
   ```

7. Play with **_Factable Server_** UI and find your function and its call.
