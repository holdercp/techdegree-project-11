# RESTful API with Express and MongoDB

## Getting Started
Ensure you have MongoDB installed on your system. Instructions can be found [here](https://docs.mongodb.com/manual/tutorial/getting-started/).

Install [Postman](https://www.getpostman.com/apps) to make API calls.

Install project dependencies with `npm install`.

Fire up MongoDB for your specific installation.

Initialize the database by running `mongo seed.js` from the project root. This creates the database and collections.

Run `npm start` to launch the API server.

## Using Postman
Import the provided Postman Collection, `Course API.postman_collection.json`, from the Postman interface.

I would suggest running the `POST Create User` request first and then updating the Basic Auth credentials under "Authorization" with the email and password.

## Testing
There are two simple tests in `test/usersTest.js`. To run these, stop the server if running, and run `npm test`. Stop the test process before starting up the server again.
