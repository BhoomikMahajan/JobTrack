<div align="center">

# 💼 JobTrack
### Your career, in focus.

A MERN stack workspace to organize job applications, track progress, and stay ahead of deadlines.

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**Organize opportunities · Monitor progress · Plan your next move**

</div>

---

## Overview

Managing job applications across spreadsheets, emails, and browser tabs can make it difficult to remember where you applied and what comes next. JobTrack brings application details, statuses, notes, and deadlines into one responsive dashboard.

The current version is a **local, single-user workspace** backed by MongoDB. Applications are entered manually; the app does not scrape job boards or submit applications automatically.

## ✨ Features

- **Application management:** add, view, edit, and delete applications.
- **Status tracking:** move applications through Applied, Interview, Offer, and Rejected.
- **Dashboard statistics:** view total applications, active applications, interviews, and offers.
- **Application pipeline:** inspect the distribution of applications by status.
- **Deadline tracking:** see upcoming and overdue dates for active applications.
- **Detailed records:** store location, work arrangement, priority, job link, and notes.
- **Search and filters:** find applications by company, role, location, or status.
- **Sorting:** order records by newest, oldest, company, or deadline.
- **Flexible views:** switch between application cards and a table.
- **CSV export:** download the applications matching the current search and status filter.
- **Responsive interface:** use the dashboard on desktop and mobile screens.
- **Validation and feedback:** required fields, allowed statuses, date/link validation, loading states, and error messages.

## 🛠️ Technology Stack

| Layer | Technologies | Purpose |
| --- | --- | --- |
| Frontend | React, CSS | Dashboard, forms, filters, and display modes |
| Frontend tooling | Vite | Development server and production build |
| Backend | Node.js, Express.js | REST API and request handling |
| Database | MongoDB / MongoDB Atlas | Persistent application storage |
| Data modelling | Mongoose | Schema, defaults, and validation |
| Configuration | dotenv | Server-side environment variables |
| Development | npm workspaces, concurrently | Manage and run frontend/backend together |

## How It Works

1. A user enters an application in the React form.
2. The frontend sends a JSON request to the Express API.
3. The backend validates editable fields using Mongoose.
4. MongoDB stores the application document.
5. The API returns the saved record, and React updates the dashboard.
6. On refresh, the frontend fetches saved applications from the API.

During development, Vite proxies `/api` requests to the Express server. Dashboard counts, search, filters, sorting, and CSV export run in the browser using the fetched records.

## 🚀 Run Locally

### Prerequisites

- Node.js **22.12+**, or a newer supported LTS release.
- npm.
- A MongoDB Atlas cluster or a running local MongoDB instance.

### 1. Get the source

Clone this repository using its **Code → HTTPS** URL, then open the project root containing `package.json` in your terminal.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend

```bash
cp server/.env.example server/.env
```

For a local MongoDB instance:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/jobtrack
PORT=5000
```

For Atlas, use your own connection string:

```env
MONGODB_URI=mongodb+srv://YOUR_DATABASE_USER:YOUR_ENCODED_PASSWORD@YOUR_CLUSTER.mongodb.net/jobtrack?retryWrites=true&w=majority
PORT=5000
```

Replace all placeholders. URL-encode special characters in the password. Atlas also requires a database user and your current IP address in the project's network access list. Keep credentials in `server/.env`; never commit this file.

### 4. Start the app

```bash
npm run dev
```

| Service | Local URL |
| --- | --- |
| React frontend | http://localhost:5173 |
| Express API | http://127.0.0.1:5000 |
| Database health | http://127.0.0.1:5000/api/health |

Keep the terminal running. Press `Ctrl+C` to stop.

### Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start frontend and backend together |
| `npm run dev -w client` | Start only the frontend |
| `npm run dev -w server` | Start only the backend |
| `npm run build` | Build the frontend |
| `node --test server/model.test.js` | Run model and input validation tests |

## 📡 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Check database connection status |
| GET | `/api/applications` | Retrieve applications, newest first |
| POST | `/api/applications` | Create an application |
| PATCH | `/api/applications/:id` | Update editable application fields |
| DELETE | `/api/applications/:id` | Delete an application |

### Example application

```json
{
  "company": "Example Company",
  "role": "Full Stack Developer",
  "date": "2026-10-26",
  "status": "Applied",
  "location": "Bengaluru",
  "workMode": "Hybrid",
  "priority": "High",
  "deadline": "2026-11-05",
  "link": "https://example.com/careers",
  "notes": "Prepare for the technical interview."
}
```

Company, role, and application date are required when creating a record. Optional fields receive defaults. Dates use `YYYY-MM-DD`.

## Project Structure

| Path | Purpose |
| --- | --- |
| `client/src/main.jsx` | React dashboard, forms, and API calls |
| `client/src/style.css` | Responsive styling |
| `client/vite.config.js` | Frontend development proxy |
| `server/index.js` | Express routes and database connection |
| `server/model.js` | Application schema and editable field validation |
| `server/model.test.js` | Validation tests |
| `server/.env.example` | Safe environment configuration template |
| `package.json` | Workspace setup and development commands |

## Verification

The frontend production build and four validation tests passed during development. Tests cover impossible dates, unsafe URLs, required fields, allowed statuses, compatibility defaults, and editable-field filtering. Automated browser checks and end-to-end operations against a live MongoDB database have not been verified.

For a manual check: add a record, edit it, change its status, refresh to confirm persistence, filter results, export CSV, check deadlines, and delete the record.

## Troubleshooting

| Problem | Check |
| --- | --- |
| `ECONNREFUSED 127.0.0.1:27017` | Local MongoDB is not accepting connections. Start it or configure Atlas. |
| Atlas connection failure | Check database credentials, cluster address, IP access list, and password encoding. |
| Frontend cannot reach the backend | Check the backend terminal and `server/.env`. |
| Port 5000 occupied | Change `PORT` in `server/.env` and the proxy target in `client/vite.config.js` together. |
| npm cannot find `package.json` | Run commands from the project root. |

## Current Scope & Future Improvements

The current app runs as a personal workspace without authentication or per-user data separation. The API binds to localhost. Deadlines are displayed inside the app; email and browser reminders are not implemented. There is no deployed demo included in this repository.

Potential next steps:

- User authentication and application ownership.
- Email or browser deadline reminders.
- Pagination for larger application histories.
- Interview scheduling and contact management.
- Production hosting with a configured API URL or reverse proxy.

## Author

**Dhruv Gupta** · [GitHub](https://github.com/dhruv020705)

---

<div align="center">Built to make the job search more organized, one application at a time.</div>
