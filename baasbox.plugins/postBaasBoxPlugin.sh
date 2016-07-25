#!/bin/bash

# post .js file contents to BaasBox to create plugin
# usage bash postBaasBoxPlugin.sh sample.js

BBsession=""
echo $BBsession
length=${#BBsession}
echo $length
url="baasbox.io"
appcode="1234567890"
echo $url

# Login loop
echo "Loggin in..."
while test $length -eq 0
do
curl http://$url/login     -d "username=admin"    -d "password=admin"    -d "appcode=1234567890"  > output.txt
sed -i -n -e 's/.*X-BB-SESSION":"//p' output.txt
sed -i -n -e 's/ *".*//p' output.txt
BBsession=$(cat output.txt)
rm output.txt
length=${#BBsession}
echo $BBsession
sleep 2
done

# Get fileName
fileName="$1"
echo $fileName

# Strip .js part of fileName to set as plugin name
codeName=${fileName/.js/}

# Encode to base64
echo "Encoding $codeName..."
base64 $fileName > "$fileName.tmp"
# Concatenate to single line
codeContent=$(while read line; do echo -n "$line "; done < "$fileName.tmp")
# Remove temp file
rm "$fileName.tmp"

# Post the data
echo "Posting plugin $codeName..."
curl \
-X POST \
-H "X-BAASBOX-APPCODE:$appcode" \
-H "X-BB-SESSION:$BBsession" \
-H "Content-Type:application/json" \
-d '{ "lang": "javascript", "name": "'"$codeName"'", "encoded": "BASE64", "code": "'"$codeContent"'", "active": "true"}' \
"http://$url/admin/plugin"
