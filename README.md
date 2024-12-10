# LendIt Mobile 

## Overview

The **Lendit Mobile Application** is a platform for listing and renting items, catering to individuals and businesses. The application is built with a MERN stack (MongoDB, Express.js, React.js, and Node.js) for the backend and uses **Expo Go** for the frontend mobile development. The project is divided into two main folders: `backend` and `frontend`.

## Prerequisites

- **Node.js** (v12.22.9 or higher)
- **npm** (Node Package Manager)
- **MongoDB** installed and running locally or accessible remotely
- **Expo Go** app installed on your mobile device (available on [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) 

## Project Structure

```
Lendit/
├── backend/    # Contains server-side code
├── frontend/   # Contains client-side code for the mobile app
├── README.md   # Setup information
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

   - A QR code will be displayed in your terminal or browser.

3. **Access the Application**

   - Open the **Expo Go** app on your smartphone.
   - Use your phone's camera to scan the displayed QR code.
   - The application will load on your phone.

   **Note:** The current frontend design is optimized for an **iPhone Pro** screen. Dynamic scaling for other phone screens has not been implemented yet.

## Notes

- Ensure the mobile device running Expo Go is on the same network as the development machine.
- If you encounter errors related to missing dependencies, ensure you have run `npm install` in both the `backend` and `frontend` folders.
- Update any environment variables or configurations as needed in the `.env` files for both backend and frontend.


