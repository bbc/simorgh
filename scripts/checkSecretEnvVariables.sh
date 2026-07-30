#!/bin/sh
if [ -z "$BFF_PATH" ]; then 
    echo No BFF_PATH set as environment variable, you will not have access to test or live data; 
fi

#!/bin/sh
if [ -z "$TOGGLES_BFF_PATH" ]; then 
    echo No TOGGLES_BFF_PATH set as environment variable, local toggles values will be used; 
fi
