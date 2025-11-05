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

The application follows **Hexagonal Architecture** to ensure high modularity, testability, and independence.

**Core Layers:**

- **Application** → Use cases and hooks
- **Domain** → Business logic and entities
- **Infrastructure** → External services and APIs
- **Presentation** → React UI components, pages, and router

```text
application/
├─ context/
├─ hooks/
domain/
├─ entities/
├─ repositories/
├─ types/
├─ usecases/
infrastructure/
├─ api/
├─ repositories/
presentation/
├─ components/
├─ pages/
├─ router/
├─ types/
```
---
## Scripts

| Command                 | Description                          |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Runs Webpack Dev Server at port 3000 |
| `npm run build`         | Creates a production build           |
| `npm run lint`          | Runs ESLint (React + TS rules)        |
| `npm run lint:fix`      | Fixes lint issues automatically                 |
| `npm run format`        | Formats code using Prettier           |
| `npm test`              | Runs Jest tests                  |
| `npm run test:watch`    | Run tests in watch mode              |
| `npm run test:coverage` | Generate Jest coverage report        |
| `npm run precommit`     | Run lint and tests before committing |


---

[//]: # (## Testing Strategy)

[//]: # ()
[//]: # ()
[//]: # (---)

## Versions

### 🧱 v0.1 - Setup

Manual setup: Webpack + React + TypeScript + ESLint  + Prettier

### 🧱 v0.2 - Domain Layer

This version introduces the **domain layer and hexagonal structure**:

- Entities: `Podcast`
- Repository Port: `PodcastRepository`
- Use Case: `GetTopPodcasts`
- Infrastructure Adapters: API + Repository
- Application Hook: `usePodcasts`

### 🧱 v0.3.0-home-page

this version introduces: Home page implemented with routing, cache, and podcastCard

---

### 🧱 v0.4.0 - Podcast Detail

Implement the Podcast Detail view (/podcast/:podcastId) with individual cache by ID, a reusable sidebar component, and a generic fetch hook with TTL caching.

#### Main Changes

* Data and Cache

* Added useFetchWithCache hook to centralize caching logic (24h TTL).

* Updated usePodcasts to use the generic hook.

* Added usePodcastDetail for podcast details and episodes.

#### New use cases:

* GetPodcastDetail

* GetTopPodcasts

#### Domain

* Added Episode entity.

  * Added new DTOs:

      * PodcastDetailResponse.ts

      * AllOriginsResponse.ts

* Extended PodcastRepository with getPodcastDetail.

#### Infrastructure

* Updated PodcastApiRepository to fetch podcast details and episodes using safe parsing and typed data.

#### Presentation

* New page PodcastDetail.tsx showing sidebar and episode list.

* New component Sidebar.tsx with podcast info.

* Updated Router.tsx with /podcast/:podcastId route.

* Updated Home.tsx



---

## 🧱 v0.5.0 - Episode Detail and Global Loading

### Overview
This version completes all required views described in the technical test:
- Home
- Podcast Detail
- Episode Detail

It also introduces a global loading system that provides visual feedback in the header while any data request is in progress.

### Main Changes
- Added **EpisodeDetail** page (`/podcast/:podcastId/episode/:episodeId`)
    - Displays the selected episode using HTML5 `<audio>` playback.
    - Reuses the existing `Sidebar` component.
    - Renders episode descriptions with safe HTML.
- Added **global loading context** (`LoadingContext`)
    - Used by all hooks to display a global spinner in the header.
    - Prevents duplicated local loading logic across pages.
- Updated **Router** to include the episode detail route.
- Updated **Header** to reactively show the loading spinner.
- Adjusted **Home** and **PodcastDetail** to integrate with the new navigation flow.

## 🧱 v0.6.0 - Styling

### Overview
This version completes the visual layer of the application.  
Native CSS has been added for layout and readability.

### Main Changes
- **Added native CSS styling** (`styles.css`)
    - Clean and minimal design using pure CSS.
    - Responsive podcast grid and card design.
    - Styled sidebar, header, and episode table.
    - Improved spacing, typography, and alignment.
- **HTML description rendering**
    - Episode descriptions that include HTML are now rendered safely using `dangerouslySetInnerHTML`.
    - Ensures that text, links, and formatting from the iTunes API are displayed as intended.
- **General layout improvements**
    - Finalized the header layout with loading spinner.
    - Adjusted routing and view spacing for consistency across pages.
- **All views completed**
    - Home (top 100 podcasts with filtering)
    - Podcast detail (episodes list)
    - Episode detail (audio player and HTML description)
    - 
## 🧱 v0.7.0 - Testing Setup and Tests

### Overview
This version introduces full test configuration and basic test coverage for the application.  
Additionally, the project has been linted and formatted to ensure code consistency.

---

### Configuration
- Added **Jest + TypeScript** integration (`jest.config.js`, `jest.setup.ts`, `jest.polyfills.ts`).
---

### Implemented Tests
1. **Unit Test** – `useFetchWithCache.test.tsx`  
   Validates caching logic, TTL handling, and error management.

2. **Integration Test** – `Home.test.tsx`  
   Tests rendering of podcast list, filtering behavior, and hook interaction.

3. **E2E Test (Simulated)** – `App.e2e.test.tsx`  
   Uses `MemoryRouter` and a mocked `fetch` to simulate the full user flow.
---

## v0.8.0 - Stability & Testing Release

### Overview
This version focuses on improving **stability, maintainability, and developer experience**.  
Error handling, routing, lazy loading, and test coverage have been enhanced to make the application more resilient and performant.

---

### Main Changes
- **Global Error Handling**
    - Added `ErrorBoundary` component for runtime error isolation.
    - Implemented `ErrorBox` for displaying friendly error messages in the UI.

- **Routing Improvements**
    - Introduced a dedicated **404 NotFound** page for unmatched routes.
    - Integrated **lazy loading** and `React.Suspense` for routes to improve performance and reduce initial bundle size.

- **Testing Enhancements**
    - Added comprehensive **unit, integration, and E2E** test coverage for core features.
    - Added coverage and watch scripts for better local testing workflow.

- **UI / CSS Adjustments**
    - Unified and cleaned repeated CSS properties for consistent layout.
    - Refined styling in `EpisodeDetail` and `PodcastDetail` pages for visual alignment.

- **Developer Experience**
    - Added precommit checks to ensure linting and tests run before commits.
    - Introduced test scripts:
      ```json
      "test:watch": "jest --watch",
      "test:coverage": "jest --coverage",
      "precommit": "npm run lint && npm test"
      ```

## 📄 License

MIT © [Josseph Alvarez]