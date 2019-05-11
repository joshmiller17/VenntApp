# VenntApp
A web app for assisting character creation and deck playing in Vennt.

## Contributing to this repo
_A beginner's guide to git_

We'll be using the terminal for interacting with this repo.
If it's your first time working with the repository, you need to clone it. 
`git clone https://github.com/joshmiller17/venntapp`

Then change directory into the project
`cd venntapp`

Now you're ready to interact with the code! Open up the files using your favorite code editor and make some changes. Alternatively, you can:
- Check what branch you're on with `git branch`
- Move to a new branch with `git checkout -b my-new-branch`
- Refresh your local files (sync with the repo) with `git pull`
- Add your changes to a commit with `git add <file>`
- Commit your changes with `git commit`
- Send these changes to the shared repo with `git push`
- Check the status of your local repository with `git status`


### General Workflow
Typically, the way you want to contribute code is:
0. Check the issues page to see what others suggest for features: https://github.com/joshmiller17/VenntApp/issues
1. Make sure you have the latest updates: `git pull`
2. Move to a new branch to work on feature X: `git checkout -b featureX`
3. Make changes to the code
    1. Add your changes to a commit: `git add <file>`
    2. Commit these changes: `git commit`
4. Push these changes `git push`
    1. Git will probably ask you to set the remote origin. This could be something like: `git branch --set-upstream featureX` or `git push -u origin featureX`
5. Go to https://github.com/joshmiller17/VenntApp/compare and create a Pull Request (PR) to request your branch be merged with the master branch, so that others can review your changes and we can collaboratively decide what changes get added


