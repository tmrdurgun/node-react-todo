To start with Docker run these commands inside root dir(where docker-compose.yml file exist)

- docker-compose build --no-cache
- docker-compose up -d (After build successful)

To run this application in local environment follow these steps:

1. Edit App.js inside api dir. (use DB_URL as process.env.DB_URL);
2. run "npm i" inside api dir.
3. run "npm i" inside ui dir.
4. run "npm run start" inside api dir.
5. run "npm run start" inside ui dir.

Node Api will listen on http://localhost:3002 and react app will start on a new tab as http://localhost:3000

To Run Api Tests:

1. Edit App.js inside api dir. (use DB_URL as process.env.DB_URL_TEST);
2. Run "npm run test" command inside api dir.