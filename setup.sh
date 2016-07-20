#!/bin/bash
echo "Installing node packages..."
npm install
echo "Installing Cordova plugins and setting up android platform..."
ionic state restore
echo "Generating icon and splash screen images..."
ionic resources
