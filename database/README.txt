For install the backen source we create a package json with:
npm init --yes
Then install the dependencies from:
npm i ejs express mogoose body-parser morgan
This line install express API and more dependences,
finally install:
npm i nodemon -D
This line install a demon as dependences of developer

On the package.json find the line "scripts" and change for this
 "scripts": {
    "dev": "nodemon src/app.js",
    "start" : "node src/app.js"
  },

To work with cors install cors on the current working directory
npm install cors