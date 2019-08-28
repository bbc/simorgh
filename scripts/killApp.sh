#!/bin/bash
lsof -t -i:7080 | xargs kill