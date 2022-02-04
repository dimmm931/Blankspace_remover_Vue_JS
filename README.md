## Blankspace remover tool on Vue Framework.

> Text editing tool on Vue Framework. Additionally uses Typo-JS Library for spell check.

- <p> The application checks text for commom punctuantion errors; it performs a check, finds, highlights and fixes all double blankspaces, blankspace + comma, blankspace + full stop. </p>
- <p> Additionally, it fixes consecutive duplicates, double commas, double dots, cases when word is preceeded by comma without no space and more, see full list below.</p>
- <p> Spell check is also available on request (Typo-Js library)</p>
- <p> Ready build script can be found at /dist </p>

## Brief overview of the application

![Screenshot](screenshots/1.png)

## On click the app corrects the text fixing found errors

![Screenshot](screenshots/2.png)

![Screenshot](screenshots/3.png)

## Detailed list of found errors

![Screenshot](screenshots/4.png)

## Input check

![Screenshot](screenshots/5.png)

## Checking for some specifics (if you tick the checkbox)

![Screenshot](screenshots/6.png)
![Screenshot](screenshots/7.png)

## Checking for misspelled words by Typo-JS Library
![Screenshot](screenshots/8.png)
![Screenshot](screenshots/9.png)
![Screenshot](screenshots/10.png)
![Screenshot](screenshots/11.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
