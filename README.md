# Location Tracker App

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google%20Maps-%234285F4.svg?style=for-the-badge&logo=google-maps&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

**Location Tracker App** is a real-time web application to request, broadcast, and track active location streams. The application manages active tracking sessions and seamlessly visualizes real-world mapping points in real time on Google Maps using modern web technologies.

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

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Local or Cloud MongoDB Instance (e.g., MongoDB Atlas)
- Google Maps API Key

### Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Shrey170/Location-Tracker.git
   cd location-tracker
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Build the frontend:
   ```bash
   cd frontend
   npm install
   # Create a .env file and add your Google Maps API Key
   echo "VITE_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env
   npm run build
   cd ..
   ```

4. Setup backend environment variables:
   Copy carefully crafted `.env.example` to your own `.env` configuration file to prevent secrets from leaking into Git.
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to insert your MongoDB connection URI and running Port.*

5. Launch the application:
   ```bash
   npm start
   ```

## 📝 License
This project is open-source.
