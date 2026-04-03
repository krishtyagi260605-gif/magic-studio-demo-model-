# Magic Studio — Deployment Guide

> **Copyright (c) 2026 Krish Tyagi**

This guide covers deploying Magic Studio in production (Docker Compose) and setting up a local development environment.

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Docker | 24+ | Container runtime |
| Docker Compose | 2.0+ | Multi-container orchestration |
| Node.js | 22+ | Frontend development |
| pnpm | 10+ | Frontend package manager |
| Python | 3.12+ | Backend development |
| uv | Latest | Python dependency management |

---

## Production Deployment (Docker Compose)

### 1. Clone and Configure

```bash
cd docker
cp .env.example .env
```

Edit `.env` to configure:
- `SECRET_KEY` — Generate with `openssl rand -base64 42`
- `DB_PASSWORD` — PostgreSQL password
- `REDIS_PASSWORD` — Redis password

### 2. Start Services

```bash
docker compose up -d
```

This starts:
- **API server** — Flask backend on port 5001
- **Worker** — Celery workers for async tasks
- **Web** — Next.js frontend on port 3000
- **PostgreSQL** — Primary database
- **Redis** — Cache and message broker
- **Nginx** — Reverse proxy on port 80
- **Sandbox** — Secure code execution
- **Plugin Daemon** — Plugin management

### 3. Initialize

Open [http://localhost/install](http://localhost/install) to create your admin account.

### 4. Verify

```bash
docker compose ps          # Check all services are running
docker compose logs api    # Check API logs
docker compose logs web    # Check web logs
```

### 5. Update

```bash
docker compose pull
docker compose up -d
```

---

## Local Development

### Quick Start

```bash
make setup    # Full setup (Docker middleware + web deps + API deps)
```

### Manual Setup

#### 1. Start Middleware (PostgreSQL, Redis, etc.)

```bash
cd docker
cp middleware.env.example middleware.env
docker compose -f docker-compose.middleware.yaml --env-file middleware.env -p magic-studio-middlewares-dev up -d
```

#### 2. Backend (Flask API)

```bash
cd api
cp .env.example .env
uv sync --dev
uv run flask db upgrade
uv run flask run --host=0.0.0.0 --port=5001 --debug
```

#### 3. Frontend (Next.js)

```bash
cp web/.env.example web/.env.local
pnpm install
cd web
pnpm dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

### Key Backend Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | — | App secret key (required) |
| `MAGIC_STUDIO_BIND_ADDRESS` | `0.0.0.0` | API bind address |
| `MAGIC_STUDIO_PORT` | `5001` | API port |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_DATABASE` | `dify` | Database name |
| `REDIS_HOST` | `localhost` | Redis host |
| `VECTOR_STORE` | `weaviate` | Vector database type |

### Key Frontend Variables

Create `web/.env.local`:

```bash
NEXT_PUBLIC_API_PREFIX=http://localhost:5001/console/api
NEXT_PUBLIC_PUBLIC_API_PREFIX=http://localhost:5001/api
```

---

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make setup` | Full development environment setup |
| `make dev` | Show dev server start instructions |
| `make build` | Build all Docker images |
| `make test` | Run backend unit tests |
| `make lint` | Run all linters (ruff, imports, dotenv) |
| `make format` | Format code with ruff |
| `make dev-clean` | Stop and clean dev Docker containers |

---

## Troubleshooting

### Common Issues

**API won't start:**
- Check `.env` exists: `ls api/.env`
- Ensure PostgreSQL is accessible: `docker compose ps db_postgres`
- Check logs: `docker compose logs api`

**Frontend build errors:**
- Use pnpm, not npm: `pnpm install && pnpm build`
- Ensure Node.js 22+: `node --version`

**Database migration errors:**
- Run migrations manually: `cd api && uv run flask db upgrade`

**Docker memory issues:**
- Allocate at least 4 GB RAM to Docker Desktop

---

## Architecture

```
┌──────────────┐     ┌──────────────┐
│   Nginx      │────▶│   Web (3000) │
│   (80/443)   │     └──────────────┘
│              │     ┌──────────────┐
│              │────▶│   API (5001) │
└──────────────┘     └──────┬───────┘
                            │
                    ┌───────┴───────┐
                    │               │
              ┌─────▼─────┐  ┌─────▼─────┐
              │ PostgreSQL │  │   Redis    │
              │   (5432)   │  │   (6379)   │
              └────────────┘  └────────────┘
```

---

© 2026 Krish Tyagi — Magic Studio
