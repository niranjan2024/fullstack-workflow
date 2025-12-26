#!/bin/bash

echo "=== User Audit Report ==="

TOTAL_USERS=$(wc -l < /etc/passwd)
echo "Total users: $TOTAL_USERS"

SHELL_USERS=$(grep -E "/bin/(bash|sh)$" /etc/passwd | wc -l)
echo "Users with shell access: $SHELL_USERS"

NO_PASS_USERS=$(awk -F: '$2=="!" || $2=="" {print $1}' /etc/shadow 2>/dev/null)

COUNT=$(echo "$NO_PASS_USERS" | wc -l)
echo "Users without password: $COUNT"

echo "$NO_PASS_USERS" | sed 's/^/  - /'

echo "Last login info for shell users:"
grep -E "/bin/(bash|sh)$" /etc/passwd | cut -d: -f1 | while read user; do
    lastlog -u "$user" | awk 'NR==2 {print "  - '"$user"': "$4}'
done
