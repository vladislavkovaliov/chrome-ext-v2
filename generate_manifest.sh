#!/bin/bash
filename="manifest.template"

read -p "Enter client id:" client_id

if [[ $client_id != "" ]]; then
    awk '{sub("__CLIENT_ID__", "'$client_id'")}1' manifest.template > temp.txt
fi