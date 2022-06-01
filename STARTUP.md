## Getting started

### Checkout the application

You can try out the application at [GarageMeet](https://garagemeetui.azurewebsites.net/).

### Serve the application locally and contribute to the project

#### Windows/Linux/MacOS

- Set up [Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- Fork this repository to your GitHub account and then clone the repository to your machine with `git clone <url-to-your-forked-repo>`
- Install [Node.js](https://nodejs.org/en/download/)
- Check that you have node package manager with `npm -v`
- Install the Angular Command Line Interface globally with `npm install -g @angular/cli`
- To launch the application locally, go to your repository directory and `cd GarageMeet` and `ng serve`
- If you have made changes that you would like to add to the project then fork this repository to yor GitHub account, `git add <file>` your changes, `git commit -m <commit message>` to commit your changes, push your commit with `git push`, and [create a pull request](https://github.com/marketplace/actions/create-pull-request#:~:text=Action%20inputs%20%20%20%20Name%20%20,%5Bcreate-pull-request%5D%20automated%20change%20%2016%20more%20rows%20) on this GitHub repository.

### Setup CI/CD

#### CD
Docker containerization and continuous deployment can be set up following [docker-cd.yml](https://github.com/Revature-GarageMeet/FrontEnd/blob/main/.github/workflows/docker-cd.yml).

#### CI
Continuous testing can be setup by following [ci.yml](https://github.com/Revature-GarageMeet/FrontEnd/blob/main/.github/workflows/ci.yml).