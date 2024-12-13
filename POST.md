# Post Collection Schema

The `post` collection represents social media posts in the database. Below is a detailed explanation of its structure and fields:

## Schema Structure

### Fields

1. **`userId`** (String)
   - The ID of the user who created the post.

2. **`title`** (String)
   - The title of the post (optional).

3. **`body`** (String)
   - The main content of the post.

4. **`reactions`** (Array of Objects)
   - Represents user reactions to the post.
   - Each object contains:
     - `userId` (String): The ID of the reacting user.
     - `fullname` (String): The full name of the reacting user.
     - `reaction` (String): Type of reaction (e.g., "like").

5. **`createdAt`** (Number)
   - Timestamp indicating when the post was created.

6. **`imgBodyUrl`** (String)
   - URL of the image attached to the post (optional).

7. **`shares`** (Array)
   - List of user IDs who shared the post.

8. **`comments`** (Array of Objects)
   - Represents comments on the post.
   - Each object contains:
     - `_id` (String): Unique ID of the comment.
     - `userId` (String): The ID of the user who made the comment.
     - `postId` (String): The ID of the post the comment belongs to.
     - `txt` (String): Text content of the comment.
     - `reactions` (Array of Objects): Reactions to the comment, similar to the `reactions` field.
     - `replies` (Array of Objects): Replies to the comment, each with fields like `_id`, `userId`, `txt`, and `createdAt`.
     - `createdAt` (Number): Timestamp of when the comment was created.

---

## Example Document
```json
{
  "userId": "62ea127beb6ee5f8058fd56e",
  "title": "",
  "body": "Example post content",
  "reactions": [
    {"userId": "62f1fd355e2c0e39215035bb", "fullname": "John Doe", "reaction": "like"}
  ],
  "createdAt": 1660681023611,
  "imgBodyUrl": "",
  "shares": [],
  "comments": [
    {
      "_id": "comment123",
      "userId": "62ea127beb6ee5f8058fd56e",
      "postId": "post123",
      "txt": "This is a comment",
      "reactions": [
        {"userId": "62f201535e2c0e39215035bf", "fullname": "Jane Smith", "reaction": "like"}
      ],
      "replies": [],
      "createdAt": 1660724533161
    }
  ]
}
```

