#!/bin/bash
set -ex

# rm -rf docs/*
# git co -- docs

yarn testsite:build
yarn testsite:serve
