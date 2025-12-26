#!/bin/bash

THRESHOLD=${1:-90}
EXIT_CODE=0

df -h | awk 'NR>1 {print $1, $5}' | while read fs usage; do
    percent=${usage%\%}

    if [ "$percent" -gt "$THRESHOLD" ]; then
        echo "WARNING: $fs is at $percent% (threshold: $THRESHOLD%)"
        EXIT_CODE=1
    else
        echo "OK: $fs is at $percent%"
    fi
done

exit $EXIT_CODE
