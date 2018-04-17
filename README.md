# Facratio ![Build status](https://travis-ci.org/udebella/facratio.svg?branch=master)

Tools to simply figure out ratios in Factorio

## How the project works

### First install
You should install dependencies of the project on the first install or when node_modules are out of date
  
Command line : `npm install`

### Run tests
Tests will prove which feature are implemented and working.
It will also output a `coverage` folder where you can find coverage report for the tests. 
  
Command line : `npm test`  
Arguments :
* watch : run tests continuously when files changes

Call example : `npm test -- watch`
  
### Build the bundle
You shall be able to create the bundle from sources. It will create the `dist` directory with minified
code inside.  

Command line : `npm run build`
