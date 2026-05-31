# 📍 Real-Time Location Tracker

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google%20Maps-%234285F4.svg?style=for-the-badge&logo=google-maps&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

### 🌍 Live Demo: [https://location-tracker-real.onrender.com](https://location-tracker-real.onrender.com)

**Location Tracker App** is a full-stack, real-time web application to request, broadcast, and track active location streams. The application manages active tracking sessions and seamlessly visualizes real-world mapping points in real-time on Google Maps using modern web technologies.

---

## ✨ Features
- **Real-Time Tracking:** Ultra-fast, bidirectional event-based communication utilizing `Socket.io`.
- **Live Google Maps:** Fully integrated with `@react-google-maps/api` for smooth and accurate mapping.
- **Modern UI:** Responsive, glassmorphism design built rapidly with `Tailwind CSS`.
- **Secure Storage:** All location requests are securely persisted and actively managed via `MongoDB`.
- **REST APIs:** Robust Express backend for handling tracking requests and acceptances.

## 🛠️ Built With
- **Frontend:** React.js, Vite, Tailwind CSS, Google Maps API
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB & Mongoose

---

## 🚀 Getting Started

Follow these step-by-step instructions to get a copy of the project up and running on your local machine for development and testing.

### 1. Prerequisites
Make sure you have the following installed and set up:
- **[Node.js](https://nodejs.org/en/)** (v18 or higher)
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** (A free cloud database cluster)
- **Google Maps API Key** (With Maps JavaScript API enabled in Google Cloud Console)

### 2. Clone the Repository
Clone the project to your local machine and navigate into the directory:
```bash
git clone https://github.com/Shrey170/Location-Tracker.git
cd Location-Tracker
```

### 3. Install Dependencies
You need to install dependencies for both the Node.js backend and the React frontend.
```bash
# Install backend dependencies
npm install

# Navigate to the frontend directory and install frontend dependencies
cd frontend
npm install
```

### 4. Configure Environment Variables
You must set up your private API keys so the app can connect to MongoDB and Google Maps.

**For the Backend:**
1. Go back to the root directory (`cd ..`).
2. Create a `.env` file in the root folder.
3. Add your MongoDB connection string and the port:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
```
*(Make sure to allow network access from `0.0.0.0/0` in MongoDB Atlas!)*

**For the Frontend:**
1. Navigate back into the frontend directory (`cd frontend`).
2. Create a `.env` file inside the `frontend` folder.
3. Add your Google Maps API key:
```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here
```

### 5. Build the Frontend
Before starting the backend server, you must build the React application so the Express server can serve the static files.
```bash
# Ensure you are still inside the /frontend directory
npm run build
cd ..
```

### 6. Run the Application
Finally, from the root folder of the project, start the Express backend server:
```bash
npm start
```

🎉 Open your browser and navigate to `http://localhost:5000` to see the app running locally!

---

## ☁️ Deployment (Render)
This repository includes a `render.yaml` Blueprint and a custom `build` script in `package.json` for seamless deployment.
1. Connect this GitHub repository to Render as a **Web Service**.
2. Set the Build Command to: `npm run build`
3. Set the Start Command to: `npm start`
4. Add your `MONGO_URI` and `VITE_GOOGLE_MAPS_API_KEY` to the Environment Variables settings in the Render Dashboard. 

## 📝 License
This project is open-source.
