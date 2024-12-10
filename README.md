# Lendit Web Application

## Overview

The **Lendit Web Application** is a platform for listing and renting items, catering to individuals and businesses. The application is built with a MERN stack (MongoDB, Express.js, React.js, and Node.js), divided into two main folders: `backend` and `frontend`.

## Prerequisites

- **Node.js** (v12.22.9 or higher)
- **npm** (Node Package Manager)
- **MongoDB** installed and running locally or accessible remotely

## Project Structure

```
Lendit/
  backend/    # Contains server-side code
  frontend/   # Contains client-side code
  README.md   # Project documentation
```

## Getting Started

You can either **clone the repository** or **download the ZIP file**:

### Option 1: Clone the Repository
1. Open a terminal and run:
   ```bash
   git clone <repository_url>
   cd Lendit
   ```

### Option 2: Download the ZIP File
1. Click on the **Code** button in the repository and select **Download ZIP**.
2. Extract the downloaded ZIP file to your desired location.
3. Navigate to the extracted folder:
   ```bash
   cd Lendit
   ```

## Installation and Setup

1. **Install Dependencies**

   - Navigate to the `backend` folder and install the required packages:
     ```bash
     cd backend
     npm install
     ```

   - Navigate to the `frontend` folder and install the required packages:
     ```bash
     cd ../frontend
     npm install
     ```

## Running the Application

1. **Start the Backend Server**

   - Open a terminal, navigate to the `backend` directory, and start the server:
     ```bash
     cd backend
     npm start
     ```
   - The backend will start listening on the configured host and port.

2. **Start the Frontend Application**

   - Split the terminal or open a new one, navigate to the `frontend` directory, and start the application:
     ```bash
     cd frontend
     npm start
     ```

   - This will start the React development server. By default, the frontend will run at `http://localhost:8000`.

3. **Access the Application**

   - Open your browser and go to `http://localhost:8000` to access the Lendit app.

## Notes

- If you encounter errors related to missing dependencies, ensure you have run `npm install` in both the `backend` and `frontend` folders.
- Update any environment variables or configurations as needed in the `.env` files for both backend and frontend.

