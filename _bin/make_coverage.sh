#!/usr/bin/env bash

function coverage {
  (
    cd "$1" || return;\
    npm run report;\
    cd ..;\
    ./cc-test-reporter format-coverage -t lcov -o tmp/"$1"api.codeclimate.json ./"$1"coverage/lcov.info;\
  )
}
mkdir -p tmp/;\
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-darwin-amd64 > ./cc-test-reporter;\
chmod +x ./cc-test-reporter;\
set -o allexport;\
source ./.env;\
set +o allexport;\

for d in */ ; do
    if [ "$d" != "_bin/" ] && [ "$d" != "node_modules/" ] && [ "$d" != "_shared/" ] && [ "$d" != "tmp/" ]; then
        echo -e "\x1b[32m*** $d lcov coverage report ***\x1b[39m";
        coverage "$d";
    fi
done
./cc-test-reporter sum-coverage tmp/*/api.codeclimate.json -o tmp/codeclimate.total.json
./cc-test-reporter upload-coverage -i tmp/codeclimate.total.json -r fad47c53ea9b61aa77a5347330971e561ba5bfcf38cb075b3e08ade43f22ddf8
