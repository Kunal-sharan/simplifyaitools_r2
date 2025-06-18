# AI Tools Directory

A full-stack web application for browsing, filtering, and favoriting AI tools.

## Features

- Browse and view AI tools
- Filter tools by category
- Search tools by name
- Add/remove favorites
- Dark mode toggle
- Mobile-friendly design

## How to Run Locally

1. **Clone the repository**
    
    ```bash
    git clone https://github.com/Kunal-sharan/simplifyaitools_r2.git
    ```
    
2. **Start the backend server**
    
    ```bash
    cd server
    npm i
    node server.js
    ```
    
3. **Start the frontend (in a new terminal)**
    
    ```bash
    cd client
    npm i
    npm run dev
    ```

## API Endpoints

### Base URL: `http://localhost:5000/api/tools`

#### 1. `GET /api/tools`
- **Description:** Fetch all AI tools or filter by category.
- **Query Parameters:**
  - `category` *(optional)* – filter tools by category name (case-insensitive)
- **Example:**
  ```bash
  curl "http://localhost:5000/api/tools?category=Writing"
  ```

#### 2. `GET /api/tools/favorites`
- **Description:** Retrieve a list of favorited tool IDs.
- **Example:**
  ```bash
  curl http://localhost:5000/api/tools/favorites
  ```

#### 3. `POST /api/tools/favorites`
- **Description:** Add a tool to favorites.
- **Request Body (JSON):**
  ```json
  {
    "toolId": 3
  }
  ```
- **Example:**
  ```bash
  curl -X POST http://localhost:5000/api/tools/favorites \
       -H "Content-Type: application/json" \
       -d '{"toolId": 3}'
  ```

#### 4. `DELETE /api/tools/favorites/:toolId`
- **Description:** Remove a tool from favorites by ID.
- **URL Parameter:**
  - `toolId` – ID of the tool to remove
- **Example:**
  ```bash
  curl -X DELETE http://localhost:5000/api/tools/favorites/3
  ```

## Screenshots

### All Tools Page

![all_tools](screenshots/all_tools.png)

### Favorites Page

![fav](screenshots/fav.png)

### Dark\Light Mode

![dark](screenshots/dark.png)
![light](screenshots/light.png)

### Mobile View

![mob](screenshots/mob.png)
