# API

Welcome to this monorepo's API! This project uses [Fastify](https://www.fastify.io/) and TypeScript, following best practices for organization, logging, and route structuring. Below you'll find information about how to run, configure, and contribute to this service.

## Table of Contents

1. [Dependencies and Requirements](#dependencies-and-requirements)
2. [Installation](#installation)
3. [Available Scripts](#available-scripts)
4. [Directory Structure](#directory-structure)
5. [Logger Configuration](#logger-configuration)
6. [Environment Variables](#environment-variables)
7. [Main Routes](#main-routes)
8. [Contributing](#contributing)
9. [License](#license)

## Dependencies and Requirements

- [Node.js](https://nodejs.org/) (version 18 or higher)
- Package manager like [pnpm](https://pnpm.io/), npm, or yarn
- Compatible database if using [Prisma](https://www.prisma.io/) (PostgreSQL, MySQL, or other)

## Installation

1. In the monorepo root directory, install all dependencies:

   ```bash
   pnpm install
   ```

2. Enter the API directory (if necessary):
   ```bash
   cd apps/api
   ```

## Available Scripts

The `package.json` file includes scripts to facilitate development and execution:

- **dev**: Starts the server in development mode (e.g., nodemon / ts-node)

  ```bash
  pnpm dev
  ```

- **build**: Compiles the TypeScript project to JavaScript in the dist folder

  ```bash
  pnpm build
  ```

- **start**: Runs the server in production using compiled files
  ```bash
  pnpm start
  ```

## Directory Structure

Below is a simplified view of the folder structure:

```
apps/api
├─ src
│  ├─ index.ts         // Entry point (initializes the server)
│  ├─ server.ts        // Main Fastify configuration (routes, plugins, logger)
│  ├─ routes           // Grouped routes (e.g., auth.routes.ts, user.routes.ts)
│  └─ plugins          // Custom plugins (e.g., logger.ts, prisma.ts)
├─ package.json
├─ tsconfig.json
└─ README.md
```

- `src/index.ts`: Entry point that executes the server initialization function
- `src/server.ts`: Defines Fastify options (e.g., logger, routes, plugins)
- `src/routes`: API routes grouping
- `src/plugins`: Custom plugins (e.g., custom logger, Prisma connection, etc.)
- `tsconfig.json`: TypeScript configurations
- `package.json`: API scripts and dependencies

## Logger Configuration

By default, this API uses Fastify's internal logger (Pino) in JSON or "pretty" mode depending on the environment. In development mode, "pino-pretty" can be configured for more readable logs. In production, structured JSON logs facilitate integration with observability tools.

Simple configuration example in `server.ts`:

```typescript
const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'UTC:standard',
        ignore: 'pid,hostname',
      },
    },
  },
})
```

Adjust according to your needs (remove or modify transport in production).

## Environment Variables

- `PORT`: Port where the API listens (default 3001)
- `NODE_ENV`: Defines the environment (development, production, etc.)
- Database connections if using Prisma or other ORM
- Create a `.env` file (excluded from versioning by `.gitignore`) to store sensitive credentials

## Main Routes

Routes are usually prefixed (e.g., `/api`). Examples:

- `POST /auth/login`
- `POST /auth/signup`
- `GET /users`

Each route is defined within `src/routes` and registered in `server.ts` or via plugin. Adjust prefixing according to your needs.

## Contributing

1. Fork this repository
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feat/my-feature
   ```
3. Commit and push changes following best practices (e.g., Conventional Commits)
4. Open a Pull Request describing the changes and wait for code review

## License

This project may be available under a permissive license (MIT, Apache 2.0, etc.) or as defined by the main repository.

© 2024 - Monorepo Team - All rights reserved or as licensed
