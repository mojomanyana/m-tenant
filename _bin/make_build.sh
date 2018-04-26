#!/usr/bin/env bash

function testing {
  (
    cd $1;\
    npm run build;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo "\x1b[32m*** $d building ***\x1b[39m";
        testing $d;
    fi
done