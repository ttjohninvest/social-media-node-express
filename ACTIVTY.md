# Activity Collection Schema

## Overview
This document describes the schema structure for the `activity` collection, which tracks user activities such as likes, comments, and other interactions.

---

## Schema Structure

### 1. Activity Details
Each activity document represents a single user action:

```json
{
  "_id": "6315fd8cc4cf8d03fd498f82",
  "type": "add-like",
  "createdBy": "630efe0d84ce02c3bd16a9ca",
  "createdTo": "630f0c02f70397ad66d5fbdc",
  "postId": "6315fd6ec4cf8d03fd498f81",
  "createdAt": 1662385548348
}
```

#### Fields:
- **`_id`**: Unique identifier for the activity.
- **`type`**: The type of activity (e.g., `add-like`, `add-comment`, `share`).
- **`createdBy`**: The user ID of the user who performed the activity.
- **`createdTo`**: The user ID of the recipient of the activity (e.g., the owner of the post).
- **`postId`**: The ID of the related post (optional for non-post activities).
- **`createdAt`**: Timestamp of when the activity occurred.

---


## Schema Summary
- **Key Relationships**:
  - `createdBy` references the user performing the activity.
  - `createdTo` references the target user of the activity.
  - `postId` references the related post (if applicable).
- **Purpose**:
  - Tracks and logs all user actions for analytics, notifications, and feed updates.

---

Let me know if additional fields or use cases should be covered!
