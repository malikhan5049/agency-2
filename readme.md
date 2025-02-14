### AWS commands
# commmand to configure aws user is 'aws configure' which will ask secret key ID, and password
ID : AKIA536FWXCSX6OSZCHH
password : stored on the machine

# command to sync changes
aws s3 sync . s3://website.itkanrepairs.com/ --exclude ".vscode/*" --exclude ".git/*" --exclude ".gitattributes" --exclude "readme.md"