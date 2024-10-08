# SkillShare Hub

SkillShare Hub is an innovative platform designed to facilitate skill-sharing and learning across a global community. Whether you're a learner seeking new knowledge or an educator looking to share expertise, SkillShare Hub provides a dynamic space for growth and collaboration.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **Diverse Courses**: Access a wide range of courses on various topics.
- **Interactive Learning**: Engage with content through quizzes, assignments, and projects.
- **Skill Sharing**: Create and share your own courses with the community.
- **User Profiles**: Track learning progress, manage courses, and showcase achievements.
- **Community Forums**: Connect with peers, discuss ideas, and collaborate on projects.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, OAuth

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- MongoDB
- Git

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/skillshare-hub.git
   cd skillshare-hub

2. **Install dependency for backend:**
  ```bash
  # Navigate to backend
  cd backend
  #Install the npm dependecies
  npm install
  #Start the server
  npm run dev

3. **Install dependency for both frontend:**
  ```bash
  # Navigate to the SkillShare Hub directory
  cd '.\SkillShare Hub\'

  # Install npm dependencies
  npm install

  # Run the frontend
  npm run dev

  # Access the application: Open your browser and navigate to http://localhost:5173

4. **Project Structure:**
    skillshare-hub/
    │
    ├── client/               # React frontend
    │   ├── public/           # Static files
    │   ├── src/              # React components, pages, etc.
    │   ├── .gitignore
    │   └── package.json
    │
    ├── server/               # Express backend
    │   ├── config/           # Database and environment configurations
    │   ├── controller/       # API Controller
    │   ├── helper/           # Role Based persmission
    │   ├── middleware/       # Authentication
    │   ├── models/           # MongoDB models
    │   ├── routes/           # API routes
    │   ├── .gitignore
    │   └── index.js          # Main server file
    │
    └── README.md

5. **Contributing:**
    Contributions are welcome! Please follow these steps:

    1. Fork the repository.
    2. Create a new branch (git checkout -b feature-branch).
    3. Make your changes.
    4. Commit and push (git push origin feature-branch).
    5. Create a pull request.

6. **License:**
    This project is licensed under the MIT License. See the LICENSE file for details.

7. **Contact:**
  
  For questions or suggestions, please reach out to:

  * Prince Kumar Sharma
  * Email: kumarprince.s0611@gmail.com
  * LinkedIn: www.linkedin.com/in/kumarprince06
