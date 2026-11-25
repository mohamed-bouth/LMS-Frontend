# LMS Frontend

A React single-page frontend for the LMS platform. It provides separate learner and administrator/trainer experiences and connects to the LMS REST API.

## Current functionality

- Login and learner registration.
- Authentication session kept in React context and persisted in `sessionStorage` for the current browser tab.
- Role-aware navigation for learners, administrators, and trainers.
- Protected routes for signed-in users and role-restricted course management.
- User profile page.
- Public course catalogue.
- Learner enrolments page with search, loading, error, empty, and retry states.
- Administrator/trainer course management: list and search courses, create and edit courses, publish or unpublish courses, and archive courses.
- Course modules route at `/courses/modules`; this page is currently a placeholder and is not connected to module data.

## Routes

| Path | Access | Page |
| --- | --- | --- |
| `/login` | Guest | Sign in |
| `/register` | Guest | Create a learner account |
| `/courses` | Public | Browse courses |
| `/profile` | Signed in | View the current user's profile |
| `/enrollments/my` | Learner | View and search enrolled courses |
| `/courses/modules` | Learner | Course modules placeholder |
| `/manage/courses` | Administrator or trainer | Manage courses |
| `/manage/courses/new` | Administrator or trainer | Create a course |
| `/manage/courses/:courseId/edit` | Administrator or trainer | Edit a course |

Unknown routes redirect to a role-appropriate page or to login.

## Technology

- React 19
- React Router 8
- Vite 8
- Tailwind CSS 4
- JavaScript with JSX
- REST requests through the browser `fetch` API

Axios and TanStack Query are not currently integrated.

## Project structure

```text
src/
├── components/                 # Shared UI, loader, icons, and route guards
├── features/
│   ├── auth/
│   │   ├── components/         # Login and registration forms
│   │   ├── contexts/            # AuthContext and useAuth
│   │   ├── pages/               # Login and registration pages
│   │   └── services/            # Authentication and profile requests
│   ├── courses/
│   │   ├── components/          # Course cards
│   │   ├── pages/
│   │   │   ├── admin/           # List, create, and edit courses
│   │   │   └── public/          # Public course catalogue
│   │   └── services/            # Course API requests
│   ├── enrollments/
│   │   ├── pages/learner/       # Learner enrolments
│   │   └── services/            # Enrolment API requests
│   ├── modules/pages/learner/   # Course modules placeholder
│   └── profile/pages/           # User profile
├── layouts/                     # Guest and authenticated layouts
├── services/api.js              # Shared fetch and authenticated request helpers
├── App.jsx                      # Route definitions and route composition
└── main.jsx                     # React entry point, BrowserRouter, AuthProvider
```

Feature-specific API functions live beside their feature. The shared API helper is in `src/services/api.js`. Authentication state and actions are provided by `AuthContext` and accessed with `useAuth()`.

## Backend configuration

Create a `.env` file in the project root:

```env
VITE_BACK_END_URL=http://localhost:3000
```

Set the value to the base URL of your running backend. The frontend currently calls these API paths:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/profiles/me`
- `GET /api/courses`
- `GET /api/trainer/courses`
- `GET /api/courses/manage/:courseId`
- `POST /api/courses`
- `PATCH /api/courses/:courseId`
- `PATCH /api/courses/:courseId/publish` or `PATCH /api/courses/:courseId/unpublish`
- `PATCH /api/courses/:courseId/archived`
- `GET /api/enrollments/me`

The backend should be running and accessible from the browser before using API-backed pages.

## Getting started

### Requirements

- Node.js compatible with the installed Vite version
- npm
- A running LMS backend

### Install and run

```bash
npm install
npm run dev
```

Vite is configured to use port `5000` by default. Configure `VITE_BACK_END_URL` before starting the development server.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
