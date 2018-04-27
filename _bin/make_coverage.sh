#!/usr/bin/env bash

function coverage {
  (
    cd $1;\
    npm run test-to-report;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo -e "\x1b[32m*** $d lcov coverage report ***\x1b[39m";
        coverage $d;
    fi
done