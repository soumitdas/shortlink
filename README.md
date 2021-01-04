# shortlink

<p align="center">
  <img alt="screenshot of shortlink" src="https://i.imgur.com/UJefdzF.png">
</p>

![Netlify](https://img.shields.io/netlify/b944ffc1-b482-42fa-b4cd-eaf8a3306b88) ![GitHub language count](https://img.shields.io/github/languages/count/soumitdas/shortlink) ![GitHub top language](https://img.shields.io/github/languages/top/soumitdas/shortlink) ![Website](https://img.shields.io/website?url=https%3A%2F%2Fapp.go6.in%2F)

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Run Locally](#run-locally)
- [License](#license)
- [Disclaimer](#disclaimer)
- [Useful Links](#useful-links)

## Features

- Short any URL without signup
- Signed up user can create custom shortlink
- Click analytics available for the links created using an account
- Only the user who created the link can access the analytics data

## Demo

### [Click here](https://app.go6.in/) for the Live Demo

## Technology Stack

- NodeJS
- ExpressJS
- ReactJS
- MongoDB
- Firebase Authentication
- Bulma CSS
- Azure App Service
- Netlify

## Run Locally

### Prerequisites

To run this project locally one should have -

- A MongoDB instance running (One can refer [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier)
- A Firebase project created (Refer [Firebase Docs](https://firebase.google.com/docs/web/setup) for more)
- ipstack API Key (optional)

### Get the repo

Download the .zip file from Github or run the below command to clone the repo locally.

```bash
git clone https://github.com/soumitdas/shortlink.git
```

### Install dependencies

After cloning the repo, run the following commands to install the project dependencies:

```bash
# for frontend
cd frontend && npm install

# back to the root directory
cd ..

# for backend
cd backend && npm install
```

### Set environment

#### Frontend

Set the environment variable in `.env` file at `frontend` directory.

```bash
REACT_APP_API_BASE_URL=http://localhost:5000
```

#### Backend

Rename `.env.sample` file in `backend` directory to `.env` and set the environment variables

```bash
APP_BASE_URL=http://localhost:5000
FRONTEND_BASE_URL=http://localhost:3000
MONGODB_URI=paste_your_mongodb_connection_string_here
FIREBASE_SERVICE_ACCOUNT=paste_your_firebase_service_account_stringified_object_here
IPSTACK_KEY=paste_your_ipstack_api_key_here_ifany
```

### Run

Open two terminal window to run both the frontend & backend and run the following commands:

#### Frontend

```bash
cd frontend && npm start
# React App will start at PORT 3000
```

#### Backend

```bash
cd backend && npm run dev
# Node API server will start at PORT 5000
```

## License

shortlink is [MIT licensed](http://opensource.org/licenses/MIT).

## Disclaimer

This project is in a very basic stage and might have severe bugs and vulnerabilities, so please keep that in mind when deploying it to production.

## Useful Links

- [React](https://reactjs.org/)
- [Node JS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Bulma](https://bulma.io/)
