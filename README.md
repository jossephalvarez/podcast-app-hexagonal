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

### 🧱 v0.3.0-home-page

this version introduces: Home page implemented with routing, cache, and podcastCard

---

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

## v0.5.0 - Episode Detail and Global Loading

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

## v0.6.0 - Styling

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
## 📄 License

MIT © [Josseph Alvarez]