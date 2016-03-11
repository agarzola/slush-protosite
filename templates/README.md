# New Prototype
Heyo! This is your new prototype project. 😍 Use and abuse it to your heart’s content (contempt?). Here’s what you can do w/it:

## Install modernizr
This template uses the modernizr CLI tool to generate a custom build.
```bash
npm run modernizr
```
The config file at `./modernizr-all.json` includes _all_ tests and options by default, which can be useful for development, but terrible for production. When you’re ready to go to production, be sure to add the individual tests and options you need in `./modernizr-prod.json` and then run:
```bash
npm run modernizr-prod
```
Either command writes a custom modernizr build into `./source/javascript/vendor/modernizr.js`, which should get piped into whatever workflow you have set up for building and serving your prototype.
