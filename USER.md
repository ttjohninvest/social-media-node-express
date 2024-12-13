# User Collection Schema

The `user` collection represents users in the social media application. Below is a detailed explanation of its structure and fields:

## Schema Structure

### Fields

1. **`username`** (String)

   - The unique username of the user.

2. **`password`** (String)

   - The hashed password of the user.

3. **`profession`** (String)

   - The profession or job title of the user.

4. **`fullname`** (String)

   - The full name of the user.

5. **`isAdmin`** (Boolean)

   - Indicates if the user has administrative privileges.

6. **`age`** (Number)

   - The age of the user.

7. **`createdAt`** (Number)

   - Timestamp indicating when the user was created.

8. **`connections`** (Array of Objects)

   - Represents the user's connections with other users.
   - Each object contains:
     - `userId` (String): The ID of the connected user.
     - `fullname` (String): The full name of the connected user.
     - `connected` (Number): Timestamp indicating when the connection was established.

9. **`following`** (Array)

   - List of user IDs the user is following.

10. **`followers`** (Array)

    - List of user IDs following the user.

11. **`gender`** (String)

    - The gender of the user (e.g., "male", "female").

12. **`phone`** (String)

    - The phone number of the user.

13. **`birthDate`** (String)

    - The birth date of the user in ISO format (YYYY-MM-DD).

14. **`email`** (String)

    - The email address of the user.

15. **`bg`** (String)

    - URL of the user's background image.

16. **`imgUrl`** (String)
    - URL of the user's profile image.

---

## Example Document

```json
{
  "username": "shlomi123",
  "password": "$2b$10$fgsK0Yomf8Vdw3.bfIXJuOd/axCVx38HuYX9E.Bh7KS2Ik4kLd2zu",
  "profession": "Full-Stack developer",
  "fullname": "Shlomi Nugarker",
  "isAdmin": false,
  "age": 30,
  "createdAt": 1659507323661,
  "connections": [
    {
      "userId": "62f138ee9f531ee7a0a6f276",
      "fullname": "eliya nugarker",
      "connected": 4235353
    },
    {
      "userId": "62f1fd355e2c0e39215035bb",
      "fullname": "Michal Dam",
      "connected": 42353353
    }
  ],
  "following": [],
  "followers": [],
  "gender": "male",
  "phone": "0529526762",
  "birthDate": "1987-12-14",
  "email": "sfs@dg.ngsdgfadf",
  "bg": "https://images.unsplash.com/photo-1556262298-e85892643712?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "imgUrl": "http://res.cloudinary.com/duajg3ah1/image/upload/v1660763357/shlomiN_mewit4.jpg"
}
```
