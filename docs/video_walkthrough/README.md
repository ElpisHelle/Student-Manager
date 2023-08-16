# Video Walkthrough

Hi, this is future Louis with the link to the video walkthrough. [Click here](https://youtu.be/iMYAMlQpHpE)! 

Notable notes include:
- Make sure you have node installed
- Run `npm install` to install all the dependencies (it'll go into the `.gitignore`'d `node_modules` folder)
- Make sure you make a `.env` file with the copy-pasted contents of `.env.example`
- `app.js` is the entry point of the application. It contains Web Socket code, Express code, and the code to start the server.
- The "**views**" folder contains EJS (Embedded JavaScript) files. These are rendered by our application.
- The "**routes**" folder contains the routes for our application. These are the URLs that our application responds to.
- The "**models**" folder contains the models for our application. These are the objects that we store in our database, and that we get using queries.
- The "**middleware**" folder contains middleware for our application. Middleware is code that runs before the route handler. We use it to check if a user is authenticated.
- The "**frontend**" folder contains the frontend code for our application. We are just using `login.html` and `registration.html` for now.
  - The **js** folder within this should have the JS code for the frontend, but currently, it is unused.
  - The **img** folder has information about our badges/achievements.
  - The **css** folder has the CSS code for the frontend (BUT WE ARE USING BOOTSTRAP, SO THIS IS FOR ADDITIONAL ADDED STYLING)
- The "**db**" folder contains the database code for our application. We are using PostgreSQL as our database, and connect through the 2 files (and `.env`) in this folder.
- The "**backend**" folder contains schema information and a DDL file for our database.