<img src="https://raw.githubusercontent.com/Bryan-Herrera-DEV/node-ts-ddd-prisma-backend/main/assets/hexagonal_draw.png" align="left" width="144px"> <h1>Typescript DDD Boilerplate</h1>

<p>Plantilla para una API con Typescript basada en arquitectura DDD.</p>
<br>

<div align="center">
    <div align="left">
        <a href="https://app.codacy.com/gh/Bryan-Herrera-DEV/node-ts-ddd-prisma-backend/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/4ba57aba7b18438193dec8d7aca6a807"/></a>
       <a href="https://app.codacy.com/gh/Bryan-Herrera-DEV/node-ts-ddd-prisma-backend/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage"><img src="https://app.codacy.com/project/badge/Coverage/4ba57aba7b18438193dec8d7aca6a807"/></a>
       <a align="center" href="https://www.npmjs.com/package/express"></a>
        <img alt="GitHub package.json dependency version (prod)" src="https://img.shields.io/github/package-json/dependency-version/bryan-herrera-dev/node-ts-ddd-prisma-backend/express">
      </a>
      <a align="center" href="https://www.npmjs.com/package/jest"></a>
        <img alt="GitHub package.json dependency version (prod)" src="https://img.shields.io/github/package-json/dependency-version/bryan-herrera-dev/node-ts-ddd-prisma-backend/jest">
      </a>
      <a align="center" href="https://www.npmjs.com/package/@prisma/client"></a>
        <img alt="GitHub package.json dependency version (prod)" src="https://img.shields.io/github/package-json/dependency-version/bryan-herrera-dev/node-ts-ddd-prisma-backend/@prisma/client">
      </a>
      <a href="https://github.com/Bryan-Herrera-DEV/node-ts-ddd-prisma-backend/blob/main/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" /></a>
      <a align="center" href="https://github.com/Bryan-Herrera-DEV/node-ts-ddd-prisma-backend/blob/main/LICENSE.md">
        <img alt="License" src="https://img.shields.io/github/license/bryan-herrera-dev/node-ts-ddd-prisma-backend.svg">
      </a>
      <a href="https://deepscan.io/dashboard#view=project&tid=21638&pid=25046&bid=776814"><img src="https://deepscan.io/api/teams/21638/projects/25046/branches/776814/badge/grade.svg" alt="DeepScan grade"></a>
    </div>
</div>

## 🤔 What does this project consist of?
This project is a starting point for you to develop a scalable web API with Node and TypeScript, and was implemented following the ideas of layered architecture, clean architecture and domain-driven design. While it contains an opinionated design and structure, it was built to be extensible and flexible, so you can modify and adapt it according to your team's needs and preferences.

## 🧱 Technology Stack and Requirements
- [TypeScript language](https://www.typescriptlang.org)
- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io)
- [Jest](https://jestjs.io)
- [Docker](https://www.docker.com)
- [Docker-compose](https://docs.docker.com/compose/)
- [PostgresSQL](https://www.postgresql.org)

## 🚀 Quick Start
### With Docker Compose
- Clone the repository
- Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- Create a `.env` file in the root directory of the project and copy the contents of the `.env.sample` file into it
- Run `docker-compose up -d` to start the application
- Run `npm run prisma:migrate` to run the migrations
- Run `npm run dev` to start the application in development mode
- Enjoy 🎉
