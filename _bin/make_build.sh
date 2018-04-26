#!/usr/bin/env bash

function testing {
  (
    cd $1;\
    echo "*** running babel build and preparing \"dist\" folder ***";\
    npm run build;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo "*** $d building ***";
        testing $d;
    fi
done