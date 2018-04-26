#!/usr/bin/env bash

function secCheck {
  (
    cd $1;\
    nsp check;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo "\x1b[32m*** $d security checking ***\x1b[39m";
        secCheck $d;
    fi
done