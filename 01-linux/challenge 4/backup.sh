#!/bin/bash

SRC=$1
DEST=$2

if [ -z "$SRC" ] || [ -z "$DEST" ]; then
    echo "Usage: $0 <source> <destination>"
    exit 1
fi

TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_FILE="$DEST/backup-$TIMESTAMP.tar.gz"

mkdir -p "$DEST"
tar -czf "$BACKUP_FILE" "$SRC"

ls -t "$DEST"/backup-*.tar.gz | tail -n +6 | xargs -r rm --

SIZE=$(du -h "$BACKUP_FILE" | cut -f1)

echo "Backup completed: $BACKUP_FILE"
echo "Backup size: $SIZE"
