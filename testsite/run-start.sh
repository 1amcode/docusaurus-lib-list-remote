#!/bin/bash
set -ex

# Cleanup previously fetched files (if any)
git checkout -- docs

yarn testsite:start
