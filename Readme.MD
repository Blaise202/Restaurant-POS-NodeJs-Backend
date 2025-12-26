# Run the backend

1. nodemon
2. npm run dev

**What to have in your dotenv**

```
PORT = ---- #
MONGODB_URI = ---- <!--Link to youe mongodb database--> mongodb+srv://<username>:<password>@restposcluster.ymlmq1q.mongodb.net/?appName=<clustername>
NODE_ENV = "development"
JWT_SECRET = ---- <!-- something like a random password-->
```

# What happened entirely

## project setup

1. npm init -y

## install dependencies

1. npm install express mongoose dotenv
2. npm install nodemon --save-dev

## installing http-errors

1. npm install http-errors

## installing bcrypt

1. npm i bcrypt

## installing web tokens for logged users

1. npm i jsonwebtoken

## installing cookies

1. npm install cookie-parser

### install cors

1. npm install cors
