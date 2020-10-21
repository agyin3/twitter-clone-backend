# API Documentation

**Backend Deployed At** https://the-twitter-clone.herokuapp.com/

## Backend Framework Used

- Node / Express
- MongoDB
- Bcrypt
- JWT

## Getting Started

## Environment Variables

```
* PORT - Port you would like to run the server on
* DB_URL - Base URL to your MongoDB
* DB_NAME - Name of your MongoDB Database
* JWT_SECRET - Unique secret used to generate and decode JWT
* TOKEN_LIFE - Lifespan of JWT Token(ex. '7 days', '2 hours')
* SALT_ROUNDS - Number of rounds to hash password
```

## Data Models

### Users
------------------

```javascript
{
   name: STRING,
   bio: STRING,
   profile_img: STRING,
   private: BOOLEAN,
   username: STRING,
   email: STRING,
   password: STRING, 
   phone: STRING,
   followers: ARRAY,
   following: ARRAY,
   liked_tweets: ARRAY,
   tweets: ARRAY
}
```

### Follower
-----------------

```javascript
{
    user: OBJECT ID,
    status: NUMBER
}
```

### Tweet
----------------

```javascript
{
    postedBy: OBJECT ID,
    text: STRING,
    location: STRING,
    likes: ARRAY,
    retweets: ARRAY,
    replies: ARRAY,
    image: STRING
}
```

## Endpoints Overview 

**Base URL** https://the-twitter-clone.herokuapp.com/api

### Auth Routes 

| Method | Endpoint       | JWT | Description                          |
| ------ | -------------- | --- | ------------------------------------ |
| POST   | /auth/register |  N  | Registers a user and returns a token |
| POST   | /auth/login    |  N  | Login user and returns a token       |


### User Routes

| Method | Endpoint             | JWT | Description                                      |
| ------ | -------------------- | --- | ------------------------------------------------ |
| GET    | /users/              |  N  | Returns a list of all the users in the database  |
| GET    | /users/:id           |  N  | Returns a single user object                     |
| GET    | /users/:id/followers |  N  | Returns a list of a single user's followers      |
| POST   | /users/:id/following |  N  | Creates a new follower/following relationship    |
