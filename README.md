# API Documentation

**Backend Deployed At**

## Backend Framework Used

- Node / Express
- MongoDB
- Bcrypt
- JWT

## Getting Started

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