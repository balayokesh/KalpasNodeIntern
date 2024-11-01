### CRUD application in NodeJS

#### To run this project locally:
#### Step 1: 
Clone the repository
```
git clone https://github.com/balayokesh/node-crud-practice.git
```
#### Step 2:
```
cd node-crud-practice
```

#### Step 3:
Install required dependency packages
```
npm i
```

#### Step 4:
Create a `.env` file in project root folder and assign your own mongoDB atlas URL to `DATABASE_URL` constant.
```
DATABASE_URL=<YOUR_OWN_API_KEY>
```

#### Step 5:
`npm run devStart`
(or) 
`nodemon server`
to start the server

#### Step 6:
Before testing the API, you need to create a collection named `admins` manually in your mongoDB.  Then insert the below document into the collection.
```
{
    username: "admin"
    password: "password"
}
```

#### Step 7: 
```
{
    username: "admin"
    password: "password"
}
```
The first API that you have to test is `/login` along with above credentials as request body.

It will return a token.  You need to pass this token in your API request body to test them
```
{
    "token": "<YOUR_TOKEN>"
}
```
