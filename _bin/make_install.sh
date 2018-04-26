#!/usr/bin/env bash

function install {
  (
    cd $1;\
    npm install "${args[0]}" --silent;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo "*** $d installing node modules ***";
        install $d;
    fi
done