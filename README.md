# GiveWings — Guide

# 🌍 GiveWings

## Transform Surplus Into Impact

GiveWings is a hyperlocal rescue and redistribution platform designed to reduce waste and maximize social impact.

The platform connects:

* Restaurants
* Event organizers
* Individuals
* NGOs
* Volunteers

through a real-time donation rescue ecosystem.

Instead of letting usable resources go to waste, GiveWings enables nearby organizations to discover, reserve, and collect donations efficiently.

---

# 🚀 Vision

Today, millions of meals, clothes, books, medicines, furniture, and usable resources are wasted while nearby communities remain underserved.

GiveWings aims to bridge this gap using:

* Hyperlocal matching
* Geo-aware discovery
* Real-time rescue operations
* Community-driven logistics
* Impact-focused technology

The long-term vision is to evolve GiveWings into a multi-resource impact platform supporting:

✅ Food rescue
✅ Clothes donation
✅ Books & education support
✅ Furniture redistribution
✅ Medicine donation coordination
✅ Electronics reuse
✅ Waste diversion & CO₂ reduction tracking
✅ Volunteer logistics
✅ NGO operational routing

---

# ✨ Current Features

## Authentication & Authorization

* JWT Authentication
* Role-Based Access Control (RBAC)
* Donor and NGO workflows

---

## Donor Flow

* Create donations
* Auto-detect current location
* GeoSpatial donation storage
* Food expiry validation

---

## NGO Flow

* Discover nearby donations
* Geo-based donation matching
* Accept donations
* Real-time operational workflow

---

## GeoSpatial Intelligence

Built using MongoDB GeoJSON + 2dsphere indexing.

Supports:

* Nearby donation discovery
* Radius filtering
* Future distance-based routing
* Hyperlocal rescue operations

---

## Real-Time Architecture Foundation

Backend WebSocket infrastructure added for:

* Live donation alerts
* NGO notifications
* Real-time status updates
* Operational dashboards

---

# 🏗️ Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

---

## Backend

* FastAPI
* Python
* JWT Authentication
* WebSockets

---

## Database

* MongoDB
* GeoJSON
* 2dsphere Indexing

---

# 🧠 Platform Architecture

```text
Donor creates donation
        ↓
Location captured automatically
        ↓
Donation stored using GeoJSON
        ↓
Nearby NGOs discover donation
        ↓
NGO accepts donation
        ↓
Pickup completed
        ↓
Impact tracked
```

---

# 📁 Project Structure

```text
GiveWings/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── db/
│   │   ├── dependencies/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── websockets/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── web-app/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# ⚙️ Local Development Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/givewings.git

cd givewings
```

---

# 2️⃣ Backend Setup

## Navigate to backend

```bash
cd backend
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv .venv
```

### Activate

```bash
.venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Create .env File

Create:

```text
backend/.env
```

Add:

```env
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=givewings
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

---

## Run Backend

```bash
python -m uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

# 3️⃣ Frontend Setup

## Navigate to web app

```bash
cd ../web-app
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 🗺️ Location Permissions

The application uses browser geolocation APIs.

Please allow location access when prompted.

---

# 🧪 Test Flow

## Donor

1. Register as DONOR
2. Login
3. Create donation

---

## NGO

1. Register as NGO
2. Login
3. Open Nearby Donations
4. Accept donation

---

# 📌 Roadmap

## Phase 1

* [x] Authentication
* [x] Role-based dashboards
* [x] Donation creation
* [x] Nearby donation discovery
* [x] GeoSpatial search
* [x] Accept donation workflow

---

## Phase 2

* [ ] Accepted donations dashboard
* [ ] Complete pickup flow
* [ ] Real-time notifications
* [ ] Live WebSocket updates
* [ ] Toast notifications
* [ ] Image uploads

---

## Phase 3

* [ ] Maps integration
* [ ] Volunteer system
* [ ] Analytics dashboard
* [ ] CO₂ impact tracking
* [ ] Donation heatmaps
* [ ] Smart routing engine

---

## Phase 4

* [ ] Clothes donation support
* [ ] Books donation support
* [ ] Furniture redistribution
* [ ] Medicine support system
* [ ] Multi-city operational scaling

---

# 🤝 Contributing

We welcome contributions from developers, designers, NGOs, students, and impact-driven communities.

## Steps to Contribute

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

# 📜 Branch Naming Convention

```text
feature/feature-name
bugfix/issue-name
hotfix/fix-name
```

---

# 💡 Contribution Ideas

* UI/UX improvements
* Maps integration
* Real-time notifications
* Accessibility improvements
* Performance optimization
* AI-based donation prioritization
* Volunteer management
* NGO verification system

---

# 🔐 Security Notes

Please do NOT commit:

* .env files
* MongoDB credentials
* Secret keys
* API keys
* Production tokens

---

# 📄 Recommended .gitignore

```gitignore
# Python
__pycache__/
*.pyc
.venv/
.env

# Node
node_modules/
dist/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

---

# 🌱 Why GiveWings?

Because technology should not only optimize businesses.

It should also:

* reduce waste
* empower communities
* improve resource accessibility
* build sustainable ecosystems
* create measurable social impact

GiveWings is being built with the belief that:

```text
small local actions can create massive collective impact.
```

---

# ⭐ Support the Project

If you like the idea:

* Star the repository
* Share the project
* Contribute
* Suggest features
* Help build impact

---

# 👨‍💻 Author

Shyam Kumar Kasturi

Building technology for impact-driven ecosystems.

---

# 🚀 Open Source Mission

GiveWings is being developed as an open-source initiative to encourage:

* collaborative innovation
* sustainable technology
* social impact engineering
* community-driven logistics

Together, we can reduce waste and maximize impact.
