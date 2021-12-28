# moviedb
A somewhat replica of themoviedb.org

# How to Run locally
## Step 1: First fork the repository and clone it onto your local computer
```
git clone https://github.com/toopham/moviedb.git
```
## Step 2: go into directory and install dependencies
```
cd moviedb
npm install
```
## Step 3: Create a secret.js file
To access the API from themoviedb.org, you will need an API key. You can get an API key by creating an account at themoviedb.org
Go to this link and follow instruction on how to get the API key: https://developers.themoviedb.org/3/getting-started/introduction
Once you have the API key, create a file called secret.js in the main directory moviedb and entered this into the file
```
const API_KEY = 'ENTER YOUR API KEY HERE';

module.exports = API_KEY;
```
## Step 4: To run the app, run the command:
```
npm run dev
```

