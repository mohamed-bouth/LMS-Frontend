# LMS Frontend

React frontend for a Learning Management System (LMS). The application will
provide separate experiences for administrators managing users and courses and
learners viewing their profile, enrolments, and progress.

## Current status

The current foundation includes:

- Responsive login and registration pages.
- Controlled authentication forms with synchronous validation.
- Backend requests for:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
- Loading, success, and error states for authentication requests.
- In-memory session handling after a successful login.
- Login and registration navigation without a client-side router.

The authenticated response is expected to contain a token and a certified user
profile, including the user's role. The frontend does not persist the session
in local storage.

## Planned functionality

The frontend will be extended with:

- Role-protected administrator views for user and course management.
- Learner views for profile, enrolled courses, modules, and progress.
- Explicit handling of unauthorized, forbidden, validation, conflict, and server
  responses.
- Shared layouts and reusable components for authenticated areas.

## Technology

- React with functional components and JSX
- Vite
- Tailwind CSS
- JavaScript modules
- REST API requests with `fetch` and `async/await`

## Project structure

```text
src/
├── components/             # Shared UI components
├── features/auth/          # Authentication components and services
├── layouts/                # Guest and authenticated layouts
├── pages/auth/             # Login and registration pages
├── services/               # Shared API access
├── App.jsx                 # Root state and conditional navigation
└── main.jsx                # Application entry point
```

## Getting started

### Requirements

- Node.js
- npm
- A running LMS backend

### Installation

```bash
npm install
```

Create a `.env` file in the project root and set the backend base URL:

```env
VITE_DOMAIN_URL=http://localhost:3000
```

Then start the development server:

```bash
npm run dev
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Development guidelines

See [`AGENTS.md`](./AGENTS.md) for the project architecture, authentication
rules, UX requirements, and validation conventions.
