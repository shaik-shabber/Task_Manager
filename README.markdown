## Task Manager Project

### Overview

This is a full-stack **Task Management System** built with a Node.js backend and a React frontend.  
The application allows users to create, update, delete tasks, and organize them by priority and status.  
Features include user authentication, task CRUD operations, priority boards, filters, and status management.

### Project Structure

- **backend/**: Node.js/Express API with MongoDB or your chosen database  
- **src/**: React frontend application  

### Features

- User registration and login  
- Create, update, and delete tasks  
- Filter tasks by status and priority  
- Priority board for drag-and-drop task management  
- Task detail view with editing and deletion  
- Responsive UI using React and Tailwind CSS  

### How to Clone This Project

Open your terminal and run:

```bash
git clone https://github.com/yourusername/your-repo.git
```

This will clone the entire project, including the backend and src folders.

### How to Run the Project Locally

#### Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend folder with your environment variables (e.g., database connection URI, JWT secret).

Start the backend server (using nodemon for development):

```bash
npm run dev
```

This will start the backend API at `http://localhost:5000` (or your configured port).

#### Frontend Setup

Navigate to the frontend folder:

```bash
cd ../src
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

This will open the frontend app at `http://localhost:3000`.

### How to Add This Project to Your Own GitHub Repository

If you want to push this existing project to your own GitHub repo, follow these steps:

1. Create a new repository on GitHub (do not initialize with README or .gitignore).

2. Open a terminal and navigate to your project root folder.

3. Initialize git (if not already initialized):

```bash
git init
```

4. Add all files:

```bash
git add .
```

5. Commit the files:

```bash
git commit -m "Initial commit"
```

6. Add your GitHub remote repository URL:

```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
```

7. Push to GitHub:

```bash
git branch -M main
git push -u origin main
```

### Technologies Used

- Node.js
- Express.js
- MongoDB / Mongoose
- React.js
- React Context API
- Tailwind CSS
- JWT Authentication

### License

This project is licensed under the MIT License.

### Contact

For any questions or suggestions, feel free to open an issue or contact me at your-email@example.com.