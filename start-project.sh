#!/bin/sh
# Create the 'hello-word' project
django-admin startproject social_network .

# Create a folder to host the future App with the name 'simple-app'.
mkdir -p app/website

# Create the 'simple-app' App
django-admin startapp website app/website