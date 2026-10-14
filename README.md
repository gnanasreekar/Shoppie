# Shoppie 🛍️
> **AI-Powered Local Commerce, Hyperlocal Marketplace & Merchant SaaS Platform**  
> Engineered for regional and tier-2/tier-3 retail ecosystems (Initial Pilot: Varni & Nizamabad, Telangana, India).

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-5.0-orange.svg)](https://astro.build/)
[![NestJS](https://img.shields.io/badge/NestJS-10.4-red.svg)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.20-teal.svg)](https://www.prisma.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-black.svg)](https://turbo.build/)

---

## 📖 Table of Contents
1. [Platform Overview](#platform-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Monorepo Structure](#monorepo-structure)
4. [Software Requirements Specification (SRS) Documents](#software-requirements-specification-srs-documents)
5. [Prerequisites](#prerequisites)
6. [Step-by-Step Installation & Setup](#step-by-step-installation--setup)
7. [Running the Platform Locally](#running-the-platform-locally)
8. [Database Management (PostgreSQL & Prisma)](#database-management-postgresql--prisma)
9. [AI Assistant & OpenAI-Compatible Configuration](#ai-assistant--openai-compatible-configuration)
10. [Subscription & Commercial Launch Strategy](#subscription--commercial-launch-strategy)
11. [Available NPM Scripts](#available-npm-scripts)

---

## 🌟 Platform Overview

Shoppie bridges small-and-medium retail merchants with nearby consumers through an integrated commerce ecosystem:
- **Hyperlocal Marketplace**: Customers discover nearby stores, compare prices, and order with 45–60 minute delivery or store pickup.
- **Merchant SaaS Suite**: Digital inventory tracking, barcode scanning, order queue management, and customer Khata (credit ledger).
- **AI Shopping & Business Copilots**: Multi-provider OpenAI-compatible AI assistant offering deal discovery for shoppers and stock replenishment/pricing optimization for merchants.
- **Configurable-First Design**: Launching with 0% pilot commission, single-merchant cart enforcement, and editable subscription tiers without code changes.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Web App** | **Astro 5 + TypeScript** | Mobile-first, zero-bloat MPA with Tailwind CSS, reactive TypeScript client islands for cart, search, and AI assistant. |
| **Backend API** | **NestJS + TypeScript** | Modular monolith with REST controllers, Swagger documentation, and JWT/Supabase authentication. |
| **Database & ORM** | **PostgreSQL 16 + Prisma** | 30+ relational entities with multi-tenant isolation, inventory tracking, order states, and audit logs. |
| **Shared Domain** | **`@shoppie/shared`** | Central TypeScript types, platform configuration presets, and authentic dummy dataset. |
| **AI LLM Engine** | **OpenAI REST Compatible** | Universal provider abstraction supporting OpenAI, Groq, Ollama (localhost), DeepSeek, and Together AI with client-side INR budget controls. |
| **Monorepo Orchestration** | **Turborepo** | High-speed cached build pipeline across workspaces. |

---

## 📂 Monorepo Structure

```text
Shoppie/
├── apps/
│   ├── web/                     # Astro 5 + TypeScript Marketplace & Merchant Portal
│   │   ├── src/
│   │   │   ├── components/      # Header, Footer, StoreCard, ProductCard, CartDrawer, AICopilotModal
│   │   │   ├── layouts/         # BaseLayout.astro with responsive mobile navigation
│   │   │   ├── lib/             # Typed Cart Manager (cart.ts) & AI Client (ai-client.ts)
│   │   │   ├── pages/           # File-based routing:
│   │   │   │   ├── index.astro            # Hyperlocal Marketplace homepage
│   │   │   │   ├── stores/                # Store directory and [slug] storefronts
│   │   │   │   ├── products/              # Product details [slug] with gallery & stock
│   │   │   │   ├── cart.astro             # Dedicated checkout with COD/UPI toggle
│   │   │   │   ├── merchant/              # Merchant SaaS portal (KPIs, Orders, Inventory)
│   │   │   │   ├── ai-assistant.astro     # AI Copilot terminal & budget slider
│   │   │   │   └── pricing.astro          # SaaS subscription tiers & launch strategy
│   │   │   └── styles/          # Tailwind CSS global stylesheet
│   │   └── astro.config.mjs     # Astro configuration (Port 4321, host-enabled)
│   │
│   └── api/                     # NestJS Backend Application
│       ├── prisma/
│       │   ├── schema.prisma    # Complete 30+ entity PostgreSQL Prisma schema
│       │   └── seed.ts          # Realistic database seeder
│       └── src/                 # Modular NestJS controllers, services, and DTOs
│
├── packages/
│   └── shared/                  # Shared TypeScript Domain Library
│       ├── src/
│       │   ├── types/           # Interfaces for Users, Merchants, Products, Carts, Orders, AI
│       │   ├── constants/       # AI provider presets, budget defaults, subscription plans
│       │   └── dummy/           # Realistic dummy data for Varni & Nizamabad retail
│       └── tsconfig.json
│
├── docker-compose.yml           # PostgreSQL 16 Alpine container configuration
├── turbo.json                   # Turborepo task pipelines
├── .env.example                 # Comprehensive environment variable template
└── README.md                    # Platform documentation & setup instructions
```

---

## 📜 Software Requirements Specification (SRS) Documents

The project was engineered according to the principles of **IEEE 29148** across 34 formal sections:
- [**SRS-Part-01-Sections-1-6.md**](./SRS-Part-01-Sections-1-6.md): Executive Summary, Business Models, Stakeholder Analysis, RBAC & Permissions, Merchant Onboarding, Storefronts.
- [**SRS-Part-02-Sections-7-13.md**](./SRS-Part-02-Sections-7-13.md): Catalog & Product Management, Inventory Tracking, Hyperlocal Discovery, Cart & Checkout, Orders, Payments, Delivery.
- [**SRS-Part-03-Sections-14-19.md**](./SRS-Part-03-Sections-14-19.md): AI Business & Shopping Assistants, LLM Architecture, Multilingual (English/Telugu), Merchant Billing, Super Admin.
- [**SRS-Part-04-Sections-20-25.md**](./SRS-Part-04-Sections-20-25.md): Database Schemas, Software Architecture, REST APIs, UI/UX Guidelines, NFRs, Cybersecurity & Privacy.
- [**SRS-Part-05-Sections-26-34.md**](./SRS-Part-05-Sections-26-34.md): Financial Projections, MVP Scope & Phased Roadmap, AI-Assisted Vibe Coding Strategy, QA & Testing, Risk Matrix, Architecture Diagrams, IEEE Traceability.

---

## ⚡ Prerequisites

Before running the project locally, ensure you have:
- **Node.js**: `v20.0.0` or higher (`node -v`)
- **npm**: `v10.0.0` or higher (`npm -v`)
- **Docker Desktop** *(optional)*: For running local PostgreSQL with Docker Compose.
- **Git**: For version control.

---

## 🚀 Step-by-Step Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gnanasreekar/Shoppie.git
cd Shoppie
```

### 2. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
cp .env.example apps/api/.env
```

### 3. Install All Dependencies
Install dependencies across all workspaces using npm:
```bash
npm install
```

### 4. Build the Shared TypeScript Package
```bash
cd packages/shared
npm run build
cd ../..
```

---

## 🖥️ Running the Platform Locally

### Start the Astro Web App (Marketplace & Merchant Portal)
```bash
cd apps/web
npm run dev
```

Open your browser:
- 🌐 **Marketplace & Local Stores**: [http://localhost:4321/](http://localhost:4321/)
- 📱 **Mobile / Local Wi-Fi Access**: `http://<your-local-ip>:4321/` (e.g. `http://192.168.1.179:4321/`)
- 🤖 **AI Assistant & Budget Controls**: [http://localhost:4321/ai-assistant](http://localhost:4321/ai-assistant)
- 🏬 **Merchant SaaS Dashboard**: [http://localhost:4321/merchant](http://localhost:4321/merchant)
- 🏷️ **SaaS Pricing & Plans**: [http://localhost:4321/pricing](http://localhost:4321/pricing)
- 🛒 **Checkout & Basket**: [http://localhost:4321/cart](http://localhost:4321/cart)

### Start the NestJS Backend API (Optional)
```bash
cd apps/api
npm run dev
```
- API Base URL: `http://localhost:3001/api/v1`
- Interactive Swagger API Docs: `http://localhost:3001/api/docs`

---

## 🐘 Database Management (PostgreSQL & Prisma)

The repository is configured to use **PostgreSQL**.

### 1. Start Local PostgreSQL with Docker
```bash
npm run db:up
```
This launches a Postgres 16 Alpine container (`shoppie-db`) listening on port `5432`.

### 2. Apply Prisma Schema to Database
```bash
npm run db:push
```

### 3. Seed Realistic Dummy Data
```bash
npm run db:seed
```
This populates the database with:
- Categories (*Kirana, Electronics, Fresh Veggies, Pharmacy*)
- Super Admin & Merchant Owners (*Patel Kirana, Kumar Electronics*)
- Verified Stores & Delivery Zones (*Varni 503201, Nizamabad 503001*)
- Products, Variants, and Stock Levels with INR pricing.

### 4. Open Prisma Studio Database GUI
```bash
npm run db:studio
```
Opens an interactive browser GUI at [http://localhost:5555](http://localhost:5555).

### 5. Stop PostgreSQL
```bash
npm run db:down
```

---

## 🤖 AI Assistant & OpenAI-Compatible Configuration

Shoppie includes an OpenAI-compatible client abstraction ([`apps/web/src/lib/ai-client.ts`](./apps/web/src/lib/ai-client.ts)).

### Supported Providers
Navigate to [**http://localhost:4321/ai-assistant**](http://localhost:4321/ai-assistant) to configure:
1. **OpenAI**: Base URL `https://api.openai.com/v1`, Model `gpt-4o-mini`.
2. **Groq**: Base URL `https://api.groq.com/openai/v1`, Model `llama-3.3-70b-versatile`.
3. **Ollama (Local / Free)**: Base URL `http://localhost:11434/v1`, Model `llama3:latest`.
4. **DeepSeek**: Base URL `https://api.deepseek.com/v1`, Model `deepseek-chat`.
5. **Together AI**: Base URL `https://api.together.xyz/v1`.

### User-Controlled Monthly Budget Limit
- Users and merchants can adjust their spending limit via the **Monthly Budget Slider (₹100 to ₹5,000 INR)**.
- A live meter tracks estimated token cost and alerts users before limits are reached.
- When no external API key is entered, the app seamlessly runs on a **smart simulated fallback** for zero-cost offline testing.

---

## 💳 Subscription & Commercial Launch Strategy

| Plan Tier | Monthly Price | Product Limit | Orders/Month | AI Queries | Staff Accounts | Key Target |
|---|---|---|---|---|---|---|
| **Starter** | **FREE** | 50 | 100 | 25 | 1 | Micro-shops & trial merchants |
| **Basic** | **₹499** | 500 | Unlimited | 150 | 3 | Established neighborhood Kiranas |
| **Professional** | **₹999** | 2,500 | Unlimited | 600 | 10 | Electronics & Multi-staff stores |
| **Enterprise** | **₹1,999** | Unlimited | Unlimited | 2,500 | Unlimited | Multi-branch supermarkets & B2B |

*All plans, commission rates (0% launch promo), and free delivery thresholds (₹499 default) are completely configurable via database records or admin settings.*

---

## 📋 Available NPM Scripts

Run these from the repository root:

| Command | Description |
|---|---|
| `npm run dev` | Runs all monorepo apps concurrently via Turborepo |
| `npm run build` | Compiles `@shoppie/shared`, `@shoppie/web`, and `@shoppie/api` |
| `npm run db:up` | Starts local PostgreSQL container via Docker Compose |
| `npm run db:down` | Stops local PostgreSQL container |
| `npm run db:push` | Pushes Prisma schema changes to PostgreSQL |
| `npm run db:seed` | Seeds database with comprehensive dummy data |
| `npm run db:studio` | Launches visual Prisma Studio at http://localhost:5555 |
| `npm run db:generate` | Generates latest Prisma Client TypeScript definitions |

---

## 📄 License
Private & Proprietary — Developed for Shoppie Local Commerce Platform.
