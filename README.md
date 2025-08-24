# CHILDCARE_TRACKER_APP
### Description:
A mobile app designed to help track vaccination schedules, monitor child growth metrics, and schedule appointments for mothers in rural areas.

### Features:
- User roles: Mother, Healthcare Worker, Admin
- Authentication (JWT)
- Children registration and mapping to mothers
- Vaccination schedule tracking and marking
- Growth monitoring (height, weight, head circumference)
- Appointment booking and reminders
- Admin coverage report
- SMS reminders for upcoming vaccinations
- Growth chart tracking
- Emergency contact support
- Local health center locator
- Offline-first with sync (frontend stores in SQLite and syncs when online)
- Multi-language 

- ## 👥 Group Details
 
**Group Number:** 22
 
| Name         | Email                   | Registration Number | Roles                              |
|--------------|-------------------------|---------------------|-------------------------------------|
| Gowtham V  | 2023lm70117@wilp.bits-pilani.ac.in | 202370117      | PM, Tester                         |
| Roshini K    | 2023lm70122@wilp.bits-pilani.ac.in   | 2023lm70122      | User Researcher, Programmer        |
| Hari Priya SM   | 2023lm70118@wilp.bits-pilani.ac.in   | 2023lm70118      | Technical Analyst, Programmer      |
| Bighneswar Baral | 2023lm70119@wilp.bits-pilani.ac.in | 2023lm70119      | User Researcher, Technical Analyst  |

 
---
 
## 🛠️ Planned Roles
 
- **Project Manager (PM):** Gowtham V
- **Tester:** Gowtham V
- **User Researcher:** Roshini K, Bighneswar Baral
- **Programmer:** Hari Priya SM, Roshini K
- **Technical Analyst:** Bighneswar Baral, Hari Priya SM



## 📁 Folder Structure
 
- `/docs` – PRD, full documentation, All system design diagrams, Google Form result files

  ## Structure
- **backend/** — Node.js + Express + SQLite (API + authentication + data persistence)
- **frontend-app/** — Expo React Native app (mobile + web demo)
---

## Backend Setup

### Requirements
- Node.js 18+
- npm

### Quickstart
```bash
cd backend
cp .env.example .env
npm install
npm run reset:db   # creates tables and seeds admin + worker
npm run dev        # starts API at http://localhost:4000
```

**Test Accounts:**
- Admin: `admin@example.com` / `Pass@123`
- Worker: `worker@example.com` / `Pass@123`

Mothers should register via `/auth/register`.

### Endpoints
See `backend/src/routes/` for available routes (auth, children, vaccinations, growth, appointments, admin, sync).

---

## Frontend Setup

### Requirements
- Node.js 18+
- npm
- Expo CLI (`npm install -g expo-cli`)

### Quickstart
```bash
cd frontend-app
npm install
npm start
```

- The API base URL defaults to `http://localhost:4000` in `src/api.js`.
- Login with test accounts or register a mother account.

### Key Screens
- **Mother:** dashboard, child profile, vaccinations, growth charts, appointments
- **Worker:** dashboard to add/list children
- **Admin:** dashboard showing coverage reports

---

## Offline Sync
- Frontend uses SQLite to queue offline growth entries.
- When online, queued data is synced to backend via `/sync/push`.

---

## Next Steps
- Integrate real SMS/notification provider (currently stubbed).
- Add WHO growth percentiles.
- Containerize with Docker for easy deployment (optional).

---

## Contributors
Team members: Gowtham, Hari Priya, Roshini, Bighneswar Baral


  
