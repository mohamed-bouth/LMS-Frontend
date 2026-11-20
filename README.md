# LMS Frontend

React frontend for a Learning Management System (LMS), with separate learner
and administrator/trainer experiences.

## Current functionality

- Login and registration forms with controlled inputs, validation, loading, and
  error states.
- React Router navigation for guest and authenticated pages.
- In-memory authenticated session synchronized with `sessionStorage`. The
  session survives a page refresh and is cleared when the browser tab closes or
  the user logs out.
- User profile page and learner enrolled-courses page, including search and
  loading, error, retry, and empty states.
- Administrator/trainer course catalogue management: list, search, create,
  edit, publish/unpublish, and archive courses.
- Role-restricted course management routes.
- A course modules route at `/courses/modules`; its page is currently a basic
  placeholder and is not yet connected to module data.

Authentication uses `POST /api/auth/login` and `POST /api/auth/register`. After
login, the frontend fetches the current user profile and uses the backend role
to route the user to the appropriate area.

## Technology

- React with functional components and JSX
- React Router
- Vite
- Tailwind CSS
- JavaScript modules
- REST API requests with `fetch` and `async/await`

## Project structure

```text
src/
├── components/                 # Shared UI components and role guard
├── features/
│   ├── auth/                   # Login, registration, and profile services
│   ├── courses/
│   │   ├── hooks/              # Course state, loading, and actions
│   │   ├── pages/admin/        # Course list, create, and edit pages
│   │   ├── pages/learner/      # Learner course pages
│   │   └── services/           # Course and enrollment API requests
│   ├── modules/pages/learner/  # Course modules page
│   └── profile/pages/          # Learner profile page
├── layouts/                    # Guest and authenticated layouts
├── services/                   # Shared API access
├── App.jsx                     # Session, routes, and page composition
└── main.jsx                    # Application entry point and BrowserRouter
```

Course-specific state and actions live in `features/courses/hooks/useCourses.js`;
API request functions stay in the feature service modules. Admin and learner
pages are separated under `features/courses/pages`.

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

The Vite development server is configured to use port `5000` by default.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 5000 |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project guidance

See [`AGENTS.md`](./AGENTS.md) for architecture, authentication, UX, and code
validation guidance.
