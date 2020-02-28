#!/bin/sh

Red="\033[0;31m"       # Red
Green="\033[0;32m"     # Green
BICyan="\033[1;96m"    # Bold Cyan

# Reset
Color_Off="\033[0m"    # Text Reset

source .env

printf "\n\n$BICyan$( echo 'Building for production' )$Color_Off"
printf "\n\n"

npm run build