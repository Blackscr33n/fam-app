# FamApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.k

## Build

Run ` ng build --output-path docs --base-href fam-app.com --prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Update dependencies, audits, checks and license report

Every once in a while we should audit the dependencies and present the PO a license overview of used packages. This should be part of a quality reassurance requirement roughly every 6 months.

- run ng update (make sure repo is clean). Update recommended Angular packages only in the same major version!

`@angular/cdk 10.2.7 -> 11.2.3 ng update @angular/cdk`

e.g. run: `ng update @angular/cli@10 @angular/core@10`

- run `npm install` to install updates matching package.json
- install npm-check globally `npm install -g npm-check`
- run `npm-check --production --skip-unused --no-emoji`
  - ignore @angular and @ngrx MAJOR UPs
  - check packages individually for compatibility
  - install recommended updates but pin major version by using ^ like: `npm install --save rxjs@^6.6.6`
  - check serve and build if nothing is broken ;)
- run `npm audit --registry=https://registry.npmjs.org` to audit ALL dependencies against npmjs.org vulnerabilities
  - make sure there are no medium or critical vulnerabilities!
  - in CI we use `npx audit-ci --skip-dev --high` which only validates production dep. and breaks on high or critical risk level
- once all packages are up to date and the app still works and builds generate license report by install npm-license-crawler globally `npm install -g npm-license-crawler`
  - run `npm-license-crawler --onlyDirectDependencies --production --dependencies --csv library_reports\libraries_boi_v2.1.csv` with the updated filename
  - import csv in Excel (comma as separator), remove last column, make first row bold and save it as .xlsx, we hand this file to the PO. The csv file can be deleted

## Deploy to Heroku

Make sure Buildpacks heroku/nodejs and [Angular CLI Elements](https://elements.heroku.com/buildpacks/angular/angular-cli) are configured

push with command `git push heroku master`
