# Stroopwafel

A casual brain game inspired by the [Stroop Effect](https://en.wikipedia.org/wiki/Stroop_effect). This intended to be a reference app for those who want to hack with [InstantDB](https://instantdb.com).

## Quickstart
Note: This assumes you've already got Expo Go and other tooling already set up

```
git clone ...
npm i
make dev
```

You should now have a local server running Stroopwafel! Fire up the simulator or scan the QR code with your phone to test it out!

## Submit Production Build
After we've verified development/preview build looks good, we may want to submit a new build the app store if we made some non-JS changes.

Doing so requires three steps:

```
# Manually increment "version" -- `autoIncrement` setting only affects buildNumber and not external facing version
# if we don't do this then the submit will fail
open app.json

# Build production app
make prod

# Submit production app
make submit
```

## TODO:
- Add notes for setting up eas (npm install --global eas-cli)
