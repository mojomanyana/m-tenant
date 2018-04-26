#!/usr/bin/env bash

function testing {
  (
    cd $1;\
    npm run test;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo -e "\x1b[32m*** $d testing ***\x1b[39m";
        testing $d;
    fi
done