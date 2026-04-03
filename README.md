# Magic Studio

**Magic Studio** is a next-generation AI workflow platform designed for building, deploying, and scaling production-ready AI applications. Owned and maintained by **Krish Tyagi**, Magic Studio provides a seamless interface for orchestration, RAG (Retrieval-Augmented Generation), and agentic workflows.

## Features

- **Intuitive Workflow Editor**: Design complex agentic flows with an easy-to-use drag-and-drop interface.
- **RAG Capability**: Built-in support for advanced retrieval with Qdrant, PGVector, and more.
- **Independent Infrastructure**: No external telemetry, no "phone-home" tracking, and full control over your data.
- **Agent-to-Agent (A2A)**: Collaborative agentic ecosystems.
- **Secure Sandbox**: Isolated Docker-based code execution for untrusted scripts.
- **Cost & Token Guardrails**: Complete observability and control over model usage costs.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 22.x
- Python 3.12.x
- pnpm (package manager)

### Installation

1. **Clone and Prepare**:
   ```bash
   git clone https://github.com/krishtyagi/magic-studio.git
   cd magic-studio
   cp .env.example .env
   ```

2. **Run Infrastructure**:
   ```bash
   docker-compose up -d
   ```

3. **Start the API**:
   ```bash
   cd api
   uv sync
   uv run flask run --host=0.0.0.0 --port=5001
   ```

4. **Start the Web Frontend**:
   ```bash
   cd web
   pnpm install
   pnpm dev
   ```

## Ownership & Community

**Magic Studio** is an independent project owned by **Krish Tyagi**. We welcome contributions from the community to help make AI exploration more accessible and powerful for everyone.

## License

Magic Studio is released under the MIT License. See `LICENSE` for more details.

---

© 2026 Krish Tyagi – Magic Studio. All rights reserved.
