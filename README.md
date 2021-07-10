# Bogo

## Table of contents
- [Introduction](#Introduction)
- [Getting Started](#Getting-Started)
- [Features](#Features)
- [Future Features](#Future-Features)
- [Technologies](#Technologies)

## Introduction

<code><img height="400" alt="boGo demo" src="https://user-images.githubusercontent.com/61637775/125164876-5e60b800-e18c-11eb-881f-6cd09f6f85d4.png"></code>

Bogo aims to connect travellers with locals in cities around the world and is fully function on both Android and iOS.

We believe that forging meanful experiences in other cultures is a catalyst for a broad and accepting mindset and aim to shake up the way we travel the world. No other travel app currently takes advantage of the fact that cities are filled with locals you will freely and willingly show people around. With an easy-to-use UI and fluid sign-up process, Bogo is fully accessable to people around the world.

Bogo was built using React Native with expo on the front-end and Apollo GraphQL and PostgreSQL on the back-end.

See the app in action [here](https://www.youtube.com/watch?v=XGm-QTy6qhg).

The front-end repository can be found [here](https://github.com/jakewmiles/bogo-client).

## Getting Started

In order to run Bogo it is necessary to install and set-up Expo. Please refer to the documentation on the Expo website for further information. This can be run on any Windows or Apple PC. Additionally, postgreSQL is required in order to run the back-end database. 

1. Clone this repo and enter!

   ```bash
   git clone https://github.com/jakewmiles/bogo-client.git
   cd bogo-client
   ```

2. Run ````npm install```` to install all the required dependencies into your local repo. 

3. Run ````expo start```` in order to generate a QR code which can be read by your personal phone with Expo installed.

4. In a separate terminal clone the back-end repo: 

   ```bash
   git clone https://github.com/jakewmiles/bogo-server.git
   cd bogo-server
   ```
   
6. Run ````npm install```` to install all the required dependencies into your local repo. 

7. Create a local .env file and input local variables using the env-template file in the root folder as guide.

8. Run ````node server.js````  from the sever root in order to start up the back-end.

9. Time to start meeting locals!

## Features

- Login through a local account
- Register using the user sign-up journey 
- Browse and filter local guides around the world
- Message local guides
- Favorite local guides
- Check and leave reviews
- Search for local sites at the target destination

## Future Features

- Enable user profile editing
- User stateful session ID authentication
- Password encyption
- Guides to offer example experiences

## Technologies

- Typescript
- Javascript
- React Native
- Expo
- Apollo Client
- GraphQL
- nodeJs
- Apollo Server
- sequelize
- postgreSQL
