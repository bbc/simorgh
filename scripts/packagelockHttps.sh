#!/bin/bash

find . -type f -name \"package-lock.json\" | grep -v node_modules | xargs -I % sh -c 'echo \"Replacing http->https in %\"; sed -i \"\" -e \"s/http:\\/\\//https:\\/\\//g\" %';