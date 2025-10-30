# Podcast App (Hexagonal Architecture Setup)

This project is a **React + TypeScript + Webpack** base prepared for building a modular, scalable application following **Hexagonal Architecture principles**.

---

## Tech Stack

- **React 18**
- **TypeScript 5**
- **Webpack 5**
- **Jest** (unit testing)
- **ESLint 9 (Flat Config)** + **Prettier**
- **CSS (no UI libraries)**

---
##  Architecture Overview

```code

```
---
##  Project Structure (current)

```code
src/
├─ index.tsx          # React entrypoint
├─ App.tsx            # Main component
├─ styles.css         # Base styles
webpack.config.js      # Webpack manual setup
tsconfig.json          # TypeScript configuration
eslint.config.mjs       # ESLint v9 Flat Config
.prettierrc            # Prettier formatting rules
```



## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Runs Webpack Dev Server at port 3000 |
| `npm run build`    | Creates a production build           |
| `npm run lint`     | Runs ESLint (React + TS rules)       |
| `npm run lint:fix` | Fixes lint issues automatically      |
| `npm run format`   | Formats code using Prettier          |
| `npm run test`     | Runs Jest tests                      |

---
## Testing Strategy


---

## Versions

| Tag                 | Description |
|---------------------|--------------|
| **v0.1-setup**      | Manual setup: Webpack + React + TypeScript + ESLint  + Prettier |
### 🧱 v0.2 - Domain Layer

This version introduces the **domain layer and hexagonal structure**:

- Entities: `Podcast`
- Repository Port: `PodcastRepository`
- Use Case: `GetTopPodcasts`
- Infrastructure Adapters: API + Repository
- Application Hook: `usePodcasts`
---
### 🧱 v0.3.0-home-page
this version introduces: Home page implemented with routing, cache, and podcastCard 


---

## 📄 License

MIT © [Josseph Alvarez]