#!/usr/bin/env bash

function clearing {
  (
    cd $1;\
    # rm -r eslint.xml;\
    # rm -r artifacts/;\
    rm -r .nyc_output/;\
    rm -r dist/;\
    cd ..;\
  )
}

for d in */ ; do
    if [ $d != "_bin/" ] && [ $d != "node_modules/" ] && [ $d != "_shared/" ]; then
        echo "\e[34m*** $d removing lint, test, artifacts ***";
        clearing $d;
    fi
done