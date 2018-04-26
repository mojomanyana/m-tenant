#!/usr/bin/env bash

function linting {
  (
    cd $1;\
    echo "*** running lint ***";\
    npm run lint;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo "*** $d linting ***";
        linting $d;
    else
        echo "*** skipping $d ***"
    fi
done