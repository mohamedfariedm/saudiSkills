#!/bin/bash

pnpm run ts
# Step 1: Add and commit changes
git add -A
git commit -m "$1"

# Step 2: Push to the current branch
git push origin branches-feature

# Step 3: Checkout development branch, pull updates, merge, and push
git checkout development
git pull origin development
git merge branches-feature
git push origin development
# Step 4: Switch back to branches-feature branch
git checkout branches-feature


# Step 5: ./git-automation.sh "add proper icons for the sidebar menu"
#git merge development