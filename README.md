# TodoList Frontend

## Overview

This is the frontend for the TodoList application, built with ReactJS and TailwindCSS. The application interacts with the backend API to manage tasks effectively, connecting to a backend service hosted on AWS EC2.

## Features

- Display a list of tasks from the backend (`GET /tasks`)
- Add new tasks (`POST /tasks`)
- Mark tasks as completed (`PUT /tasks/{id}`)
- Delete tasks (`DELETE /tasks/{id}`)
- Responsive design for mobile and desktop

## Technologies Used

- **ReactJS** (Frontend framework)
- **TailwindCSS** (Styling)
- **Axios** (API communication)
- **Vite** (Development and build tool)

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Install and Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/todolist-frontend.git
   cd todolist-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open the application in your browser at `http://localhost:5173`

## Build for Production

To create a production build, run:

```sh
npm run build
# or
yarn build
```

## Environment Variables

Create a `.env` file and configure the API endpoint:

```
VITE_API_URL=http://localhost:8080
```

## API Endpoints Used

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | /tasks      | Get all tasks      |
| POST   | /tasks      | Add a new task     |
| PUT    | /tasks/{id} | Update task status |
| DELETE | /tasks/{id} | Delete a task      |

## License

This project is licensed under the MIT License.

## Author

[Huynh Nhat Khanh]
