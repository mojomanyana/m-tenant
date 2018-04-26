#!/usr/bin/env bash

function testing {
  (
    cd $1;\
    echo "*** running tests and coverage ***";\
    npm run test;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo "*** $d testing ***";
        testing $d;
    else
        echo "*** skipping $d ***"
    fi
done