#!/bin/bash
# This script should only be used locally, never on CI
lsof -t -i:7080 | xargs kill
