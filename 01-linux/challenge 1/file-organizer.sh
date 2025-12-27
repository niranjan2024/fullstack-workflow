#!/bin/bash

DIR=$1

if [ -z "$DIR" ] || [ ! -d "$DIR" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

cd "$DIR" || exit 1

declare -A count

for file in *.*; do
    [ -f "$file" ] || continue
    ext="${file##*.}"
    mkdir -p "$ext"
    mv "$file" "$ext/"
    ((count[$ext]++))
done

for ext in "${!count[@]}"; do
    echo "Organized ${count[$ext]} .$ext files"
done
