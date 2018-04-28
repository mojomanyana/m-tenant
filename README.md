# m-tenant [![Maintainability](https://api.codeclimate.com/v1/badges/96be3b17c3faa41eabbd/maintainability)](https://codeclimate.com/github/mojomanyana/m-tenant/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/96be3b17c3faa41eabbd/test_coverage)](https://codeclimate.com/github/mojomanyana/m-tenant/test_coverage) [![bitHound Overall Score](https://www.bithound.io/github/mojomanyana/m-tenant/badges/score.svg)](https://www.bithound.io/github/mojomanyana/m-tenant) [![bitHound Dev Dependencies](https://www.bithound.io/github/mojomanyana/m-tenant/badges/devDependencies.svg)](https://www.bithound.io/github/mojomanyana/m-tenant/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/mojomanyana/m-tenant/badges/code.svg)](https://www.bithound.io/github/mojomanyana/m-tenant)

This is serverless approach for multi tenant SAAS boilreplate, you can build upon this your next SAAS startup.

## Basic dev guides
- For this project we use AirBnb code style `https://github.com/airbnb/javascript`
- We user AWS SAM framework for building our API `https://github.com/awslabs/serverless-application-model`

## Basic local setup
- Setup node 8.10.0 and npm 5.6.0 on your local environment
- Clone repository
- run `bash _bin/make_install.sh`
- This will update all your node_modules

## Basic linting
- Finish `Basic local setup`
- run `bash _bin/make_lint.sh`
- This will run lint on all folders

## Basic testing
- Finish `Basic local setup`
- run `bash _bin/make_test.sh`
- This will run tests on all folders and create coverage report
