# m-tenant [![Maintainability](https://api.codeclimate.com/v1/badges/96be3b17c3faa41eabbd/maintainability)](https://codeclimate.com/github/mojomanyana/m-tenant/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/96be3b17c3faa41eabbd/test_coverage)](https://codeclimate.com/github/mojomanyana/m-tenant/test_coverage) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmojomanyana%2Fm-tenant.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmojomanyana%2Fm-tenant?ref=badge_shield) [![Build Status](https://travis-ci.org/mojomanyana/m-tenant.svg?branch=master)](https://travis-ci.org/mojomanyana/m-tenant) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/cbb82fc84dbc4f199552e413b6b9d91f)](https://www.codacy.com/app/mojomanyana/m-tenant?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mojomanyana/m-tenant&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/cbb82fc84dbc4f199552e413b6b9d91f)](https://www.codacy.com/app/mojomanyana/m-tenant?utm_source=github.com&utm_medium=referral&utm_content=mojomanyana/m-tenant&utm_campaign=Badge_Coverage)

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
