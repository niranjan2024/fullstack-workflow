#!/bin/bash

PROCESS=$1
INTERVAL=${2:-5}

if [ -z "$PROCESS" ]; then
    echo "Usage: $0 <process_name> [interval]"
    exit 1
fi

while true; do
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$TIMESTAMP] checking $PROCESS..."

    if ps -ef | grep -w "$PROCESS" | grep -v grep > /dev/null; then
        echo "$PROCESS is running"
    else
        echo "ALERT: $PROCESS stopped"
        exit 1
    fi

    sleep "$INTERVAL"
done
