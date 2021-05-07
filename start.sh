#!/bin/bash
case "$1" in
  prod)
    export NODE_ENV=production
    nodemon ./index.js
  ;;
  test)
    export NODE_ENV=test
    nodemon ./index.js
  ;;
  dev)
    export NODE_ENV=development
    nodemon ./index.js
  ;;
  *)
    echo "Comandos : {prod|qa|dev}"
    exit 1
  ;;
esac
