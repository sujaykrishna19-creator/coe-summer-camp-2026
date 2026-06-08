#!/bin/bash
# COE Summer Camp 2026 Deployment Helper

echo "============================================="
echo "COE Summer Camp 2026 Website Deployer"
echo "============================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "Initializing git..."
  git init
  git add .
  git commit -m "Initial commit of COE Summer Camp website"
fi

# Ask for GitHub username
read -p "Enter your GitHub username: " username

if [ -z "$username" ]; then
  echo "Error: Username cannot be empty."
  exit 1
fi

repo_name="coe-summer-camp-2026"

echo ""
echo "Adding remote origin for https://github.com/$username/$repo_name.git..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$username/$repo_name.git"

echo ""
echo "Preparing to push..."
echo "Note: If prompted, enter your GitHub username and Personal Access Token (PAT) as the password."
echo "--------------------------------------------------------"
git branch -M main

if git push -u origin main; then
  echo ""
  echo "============================================="
  echo "🎉 SUCCESS: Code pushed to GitHub!"
  echo "============================================="
  echo ""
  echo "Next Steps to Enable GitHub Pages:"
  echo "1. Open your browser and go to your repository settings:"
  echo "   https://github.com/$username/$repo_name/settings/pages"
  echo "2. Under 'Build and deployment' -> 'Source', select 'Deploy from a branch'."
  echo "3. Under 'Branch', select 'main' (and leave folder as '/ (root)')."
  echo "4. Click 'Save'."
  echo "5. Wait 1 minute for GitHub to compile and launch."
  echo "   Your site will be live at: https://$username.github.io/$repo_name/"
  echo ""
  echo "============================================="
  echo "📋 Google Sites Embed Script"
  echo "============================================="
  echo "In Google Sites, choose 'Insert' -> 'Embed' -> 'Embed code' and paste this:"
  echo ""
  echo "<iframe src=\"https://$username.github.io/$repo_name/\" width=\"100%\" height=\"850px\" style=\"border:none; border-radius: 16px; box-shadow: 0 4px 30px rgba(0,0,0,0.05); overflow: hidden;\" allowfullscreen></iframe>"
  echo ""
  echo "---------------------------------------------"
else
  echo ""
  echo "❌ Error: Failed to push code."
  echo "Please check that:"
  echo "1. You have created an EMPTY repository named '$repo_name' on your GitHub account."
  echo "2. You have a valid GitHub Personal Access Token (PAT) if prompted for a password."
fi
