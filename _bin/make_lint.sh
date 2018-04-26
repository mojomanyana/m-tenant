#!/usr/bin/env bash

function linting {
  (
    cd $1;\
    var=npm run lint;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo -e "\x1b[32m*** $d linting ***\x1b[39m";
        linting $d;
    fi
done