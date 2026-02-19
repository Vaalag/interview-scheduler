A full-stack web application that allows users to schedule, manage, and organize interview slots efficiently. The application includes a frontend interface, backend API, and containerized setup using Docker for easy deployment and development.

📌 Features

Create interview slots

Book interviews

Edit scheduled interviews

Delete interview bookings

Backend API for data handling

Dockerized environment for easy setup

🛠️ Tech Stack

Frontend

HTML / CSS / JavaScript

(Add React / Next.js if used)

Backend

Node.js

Express.js

DevOps

Docker

Docker Compose

📂 Project Structure
interview-scheduler/
│
├── frontend/         # Client-side application
├── backend/          # Server-side API
├── docker-compose.yml
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Vaalag/interview-scheduler.git
cd interview-scheduler

2️⃣ Run Using Docker
docker compose up


This will start both frontend and backend services.

3️⃣ Open in Browser

Visit:

http://localhost:3000


(Or the port configured in docker-compose.yml)

🧪 How It Works

The frontend provides an interface for users to view and schedule interviews.

The backend handles API requests and manages interview data.

Docker ensures consistent development environment across systems.
