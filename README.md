# 🌍 GiveWings

## Transform Surplus Into Impact

GiveWings is a hyperlocal rescue and redistribution platform designed to reduce waste and maximize social impact through real-time donation coordination.

The platform connects:

- Restaurants
- Event organizers
- Individuals
- NGOs
- Communities

through a geo-aware operational rescue ecosystem.

Instead of allowing usable resources to go to waste, GiveWings enables nearby NGOs to discover, verify, reserve, navigate to, and collect donations efficiently.

---

# 🚀 Vision

Millions of meals and usable resources are wasted daily while nearby communities remain underserved.

GiveWings aims to bridge this gap using:

- Hyperlocal matching
- GeoSpatial discovery
- Real-time rescue coordination
- Operational logistics workflows
- Impact-driven technology

The long-term mission is to evolve GiveWings into a scalable multi-resource redistribution platform supporting:

✅ Food rescue
✅ Clothes donation
✅ Books & education support
✅ Furniture redistribution
✅ Electronics reuse
✅ Medicine donation coordination
✅ Waste diversion systems
✅ CO₂ reduction visibility
✅ Volunteer logistics
✅ NGO operational routing

---

# ✨ Current Features

# 🔐 Authentication & Authorization

- JWT Authentication
- Role-Based Access Control (RBAC)
- Donor and NGO workflows
- Protected routes
- Token-based session management

---

# 🙋 Donor Workflow

Donors can:

✅ Register & login
✅ Create donations
✅ Auto-detect current location
✅ Upload donation images
✅ Add expiry details for food
✅ Track donation lifecycle
✅ View donation statuses

---

# 🏢 NGO Workflow

NGOs can:

✅ Discover nearby donations
✅ View operational donation details
✅ See donor details
✅ View uploaded donation images
✅ View urgency indicators
✅ See distance-aware donations
✅ Navigate using Google Maps
✅ Accept donations
✅ Mark pickups as completed

---

# 🌍 GeoSpatial Intelligence

Built using MongoDB GeoJSON + 2dsphere indexing.

Supports:

- Nearby donation discovery
- Radius filtering
- Distance-based matching
- Hyperlocal rescue operations
- Future routing systems

---

# 🖼️ Media & Verification Layer

Donation images are uploaded using Cloudinary.

This enables:

- Visual donation verification
- NGO operational confidence
- Reduced failed pickups
- Better pickup coordination

Architecture:

```text
Frontend
   ↓
Backend Upload API
   ↓
Cloudinary Storage + CDN
   ↓
MongoDB stores image URL
```

---

# 🗺️ Navigation & Pickup Coordination

NGOs can directly open donation locations in Google Maps.

This significantly reduces:

- pickup coordination friction
- rescue delays
- manual location sharing

Operational focus:

```text
Reduce time-to-pickup.
```

# 🏗️ Tech Stack

# Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

---

# Backend

- FastAPI
- Python
- JWT Authentication
- WebSockets

---

# Database

- MongoDB
- GeoJSON
- 2dsphere Indexing

---

# Cloud Services

- Cloudinary (image hosting)

# 🔄 Platform Workflow

```text
Donor creates donation
        ↓
Location captured automatically
        ↓
Donation image uploaded
        ↓
Donation stored using GeoJSON
        ↓
Nearby NGOs discover donation
        ↓
NGO verifies donation visually
        ↓
NGO navigates using Google Maps
        ↓
Donation accepted
        ↓
Pickup completed
        ↓
Impact created
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
│   │   ├── utils/
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

# 3️⃣ Create Environment Variables

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

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# ☁️ Cloudinary Setup

Image uploads require a free Cloudinary account.

## Create Account

[https://cloudinary.com](https://cloudinary.com)

After signup:

Dashboard → API Environment

Copy:

- Cloud Name
- API Key
- API Secret

Add them into:

```text
backend/.env
```

---

# 4️⃣ Run Backend

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

# 5️⃣ Frontend Setup

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

# 📍 Browser Location Permissions

The application uses browser geolocation APIs.

Please allow location access when prompted.

---

# 🧪 Complete Test Flow

# Donor Flow

1. Register as DONOR
2. Login
3. Create donation
4. Upload donation image
5. Submit donation
6. Track donation status

---

# NGO Flow

1. Register as NGO
2. Login
3. Open Nearby Donations
4. View donation image
5. View urgency & distance
6. Open navigation in Google Maps
7. Accept donation
8. Complete pickup

---

# 🌱 Open Source Workflow

# Branch Naming Convention

```text
feat/feature-name
fix/issue-name
ui/component-name
```

Examples:

```text
feat/google-maps-navigation
feat/donation-image-upload
fix/location-permission-flow
ui/dashboard-redesign
```

---

# 🧾 Contribution Workflow

```bash
# Create feature branch
git checkout -b feat/your-feature-name

# Commit changes
git add .
git commit -m "Your commit message"

# Push branch
git push -u origin feat/your-feature-name
```

Then:

1. Open Pull Request
2. Review changes
3. Merge into main
4. Delete feature branch

---

# 📌 Current Roadmap

# ✅ Completed

- [x] JWT Authentication
- [x] Role-based dashboards
- [x] Donation creation workflow
- [x] NGO discovery flow
- [x] GeoSpatial search
- [x] Nearby donation matching
- [x] Donation acceptance workflow
- [x] Pickup completion workflow
- [x] Donor donation tracking
- [x] Google Maps navigation
- [x] Distance-aware discovery
- [x] Urgency prioritization
- [x] Donation image uploads
- [x] Cloudinary integration

---

# 🚧 In Progress

- [ ] Pickup coordination details
- [ ] Real-time WebSocket notifications
- [ ] Mobile responsiveness improvements
- [ ] Human-readable address resolution

---

# 🚀 Future Scope

- [ ] Volunteer coordination system
- [ ] CO₂ reduction tracking
- [ ] NGO operational analytics
- [ ] Donation heatmaps
- [ ] Smart routing engine
- [ ] Clothes donation support
- [ ] Books donation support
- [ ] Furniture redistribution
- [ ] Electronics reuse workflows
- [ ] Multi-city operational scaling

---

# 🔐 Security Notes

Please do NOT commit:

- `.env` files
- MongoDB credentials
- Secret keys
- Cloudinary secrets
- Production tokens

Use:

```text
.env.example
```

for contributor onboarding.

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

- reduce waste
- empower communities
- improve resource accessibility
- build sustainable ecosystems
- create measurable social impact

GiveWings is being built with the belief that:

```text
small local actions can create massive collective impact.
```

---

# 🤝 Contributing

We welcome contributions from:

- developers
- designers
- NGOs
- students
- open-source contributors
- impact-driven communities

Contribution areas:

- UI/UX improvements
- operational workflows
- maps integration
- accessibility
- performance optimization
- NGO verification systems
- real-time systems
- mobile optimization

---

# ⭐ Support the Project

If you like the idea:

- Star the repository
- Share the project
- Suggest improvements
- Open issues
- Contribute features
- Help scale impact

---

# 👨‍💻 Author

Shyam Kumar Kasturi

Building technology for impact-driven ecosystems.

---

# 🚀 Open Source Mission

GiveWings is being developed as an open-source initiative to encourage:

- collaborative innovation
- sustainable technology
- social impact engineering
- community-driven logistics
- waste reduction ecosystems

Together, we can reduce waste and maximize impact.
