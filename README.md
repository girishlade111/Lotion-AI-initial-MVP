# Lotion AI — Notion AI Clone (Initial MVP)

A pixel-perfect **Notion AI clone** with a block-based editor, AI assistant panel, kanban projects, and calendar — built as an initial MVP with a fully working mock frontend plus a production-ready FastAPI backend.

## Features

- **Block-based editor** — text, headings (H1–H3), bullets, numbered lists, checkboxes with strike-through, code blocks, callouts; `/` block-type menu; drag/add/delete hover controls
- **AI Assistant panel** — chat interface with quick prompts, mock AI actions (rewrite, summarize, translate, grammar fix, continue writing), text-selection menu, message history
- **Home dashboard** — time-based greeting, AI prompt box, quick actions, recent pages, template gallery
- **Projects** — multi-project kanban boards with color coding
- **Backend (FastAPI)** — JWT auth, MongoDB persistence, CORS configured; ready to wire the frontend to real APIs

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React (Create React App + CRACO), Tailwind CSS, Zustand, Radix UI, Framer Motion, Axios |
| Backend | Python 3, FastAPI, Uvicorn, MongoDB (PyMongo), JWT (PyJWT) |
| Deploy | Static build (`npm run build`) → any static host |

## Quick Start

### Frontend (mock mode, no backend needed)

```bash
cd frontend
npm install --legacy-peer-deps
npm start        # dev server on http://localhost:3000
```

The frontend ships with rich mock data in `frontend/src/data/mockData.js` persisted to LocalStorage via Zustand — it works fully standalone.

### Production build

```bash
cd frontend
npm run build    # outputs to frontend/build/
```

Serve `frontend/build/` with any static host (Cloudflare Pages, GitHub Pages, Netlify).

### Backend (optional, for real persistence)

```bash
cd backend
pip install -r requirements.txt
export MONGO_URL="mongodb://localhost:27017"
export DB_NAME="lotion_ai"
export CORS_ORIGINS="*"
uvicorn server:app --host 0.0.0.0 --port 8001
```

Point the frontend at it via `REACT_APP_BACKEND_URL` in `frontend/.env`.

## Project Structure

```
.
├── frontend/           # React app (CRA + CRACO + Tailwind + Zustand)
│   ├── src/
│   │   ├── pages/      # Home, Login, Editor, Projects, Calendar
│   │   ├── components/ # BlockEditor, AIAssistant, UI kit
│   │   ├── data/       # mockData.js (mock dataset)
│   │   └── store/      # Zustand stores (LocalStorage-persisted)
│   └── public/
├── backend/            # FastAPI server (JWT auth, MongoDB)
├── contracts.md        # Frontend implementation contracts / status
├── tests/              # test suite
├── test_result.md      # test results
└── README.md
```

## Environment Variables

| Variable | Where | Required for |
|---|---|---|
| `REACT_APP_BACKEND_URL` | `frontend/.env` | Pointing frontend at a live backend (defaults to mock mode) |
| `MONGO_URL` | backend | MongoDB connection string |
| `DB_NAME` | backend | MongoDB database name |
| `CORS_ORIGINS` | backend | Allowed origins, comma-separated (default `*`) |

## Deploy Notes

- The MVP deploys as a **static site** from `frontend/build/` — no server required for the mock-mode demo.
- For real backend-backed deployment, deploy the FastAPI app (Uvicorn) separately and set `REACT_APP_BACKEND_URL` at frontend build time.

---

Built by Girish Lade — https://ladestack.in
