# Childcare Tracker — Backend (Express + SQLite)

## Quick start
```bash
cp .env.example .env
npm install
npm run reset:db
npm run dev
```

### Test accounts
- Admin: admin@example.com / Pass@123
- Worker: worker@example.com / Pass@123
- Mother: create via /auth/register

### Endpoints
See src/routes/*.js for routes such as auth, children, vaccinations, growth, appointments, admin, sync.
