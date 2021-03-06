#!/usr/bin/env bash

function install {
  (
    cd "$1" || return;\
    npm install;\
    cd ..;\
  )
}

npm install;

for d in */ ; do
    if [ "$d" != "_bin/" ] && [ "$d" != "node_modules/" ] && [ "$d" != "_shared/" ] && [ "$d" != "tmp/" ]; then
        echo -e "\x1b[32m*** $d installing node modules ***\x1b[39m";
        install "$d";
    fi
done