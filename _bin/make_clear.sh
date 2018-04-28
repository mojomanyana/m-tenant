#!/usr/bin/env bash

function clearing {
  (
    cd $1;\
    rm -r .nyc_output/;\
    rm -r dist/;\
    rm -r coverage/;\
    cd ..;\
  )
}

rm -r tmp/;\
rm cc-test-reporter;

for d in */ ; do
    if [ "$d" != "_bin/" ] && [ "$d" != "node_modules/" ] && [ "$d" != "_shared/" ] && [ "$d" != "tmp/" ]; then
        echo -e "\x1b[32m*** $d removing lint, test, artifacts ***\x1b[39m";
        clearing $d;
    fi
done