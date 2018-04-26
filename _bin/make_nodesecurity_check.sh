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
        echo "*** $d security checking ***";
        secCheck $d;
    fi
done