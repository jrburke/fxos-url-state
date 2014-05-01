# fxos-url-state

A FirefoxOS app that uses pushState to manage state changes. This is a test
app to see how the FirefoxOS system handles app restoration.

Navigate in the app, and then trigger different system behaviors for closing
the app, then restarting the app to see if the history state is preserved.

## Directory layout

This web project has the following setup:

* **fxos-url-state/ - the source of app.
* tools/ - the build tools to optimize the project.
* **build/fx-os-url** - where the built/optimized version of the app is
generated when the optimization command is run.

### Deployment

You can use the [App Manager]() in Firefox to deploy the **fxos-url-state**
directly to your phone for testing. If you want to create an app zip of the
source area for distributing to others:

    cd fxos-url-state
    zip -r fxos-url-state.zip ./*

### Optimized build

To optimize, run:

    node tools/r.js -o tools/build.js

That build command creates an optimized version of the project in a
**build/fxos-url-state** directory. That directory can also be used as the app
zip by doing the following:

    cd build/fxos-url-state
    zip -r fxos-url-state.zip ./*
