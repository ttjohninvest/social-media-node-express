# Chat Schema

## Overview

This document describes the schema structure for a chat application, including users, messages, and metadata.

---

## Schema Structure

### 1. Chat Details

The root of the chat schema contains general information about the chat:

```json
{
  "_id": "674decc9d37cf32c762132a9",
  "createdAt": 1733160129863,
  "userId": "630efe0d84ce02c3bd16a9ca",
  "userId2": "630f0c02f70397ad66d5fbdc"
}
```

- **`_id`**: Unique identifier for the chat.
- **`createdAt`**: Timestamp of chat creation.
- **`userId`**: Identifier for the first user.
- **`userId2`**: Identifier for the second user.

---

### 2. Messages

An array of messages exchanged in the chat:

```json
"messages": [
  {
    "_id": "Udd5m7BEYplZNbFwq51CAYYg",
    "txt": "hello",
    "userId": "630f0c02f70397ad66d5fbdc",
    "createdAt": 1733160138095
  },
  {
    "_id": "z3gMgS3Tlvcqad5rRBg8WGUa",
    "txt": "hii",
    "userId": "630f0c02f70397ad66d5fbdc",
    "createdAt": 1733247245880
  }
]
```

#### Fields:

- **`_id`**: Unique identifier for the message.
- **`txt`**: Content of the message.
- **`userId`**: Identifier of the message sender.
- **`createdAt`**: Timestamp of when the message was sent.

---

### 3. Users

An array of users participating in the chat:

```json
"users": [
  "Guest",
  null
]
```

#### Fields:

- **`users[0]`**: Name or identifier of the first user.
- **`users[1]`**: Name or identifier of the second user (can be `null` if not specified).

---
