# Sonata Accounts - Project Guidelines

This project is a React-based web application for the Sonata music platform. It handles user accounts, playlists, and audio playback synchronization.

## Tech Stack
- **Framework:** React 18 (TypeScript)
- **UI Library:** Material UI (MUI) v6
- **Styling:** Emotion, Styled Components, and Vanilla CSS
- **State Management:**
    - **Zustand:** Used for global player state (`src/hooks/usePlayer.ts`).
    - **React Context:** Used for authentication (`src/context/AuthContext.tsx`).
- **Routing:** React Router v6
- **Real-time:** WebSockets via `react-use-websocket`
- **Audio Playback:** `react-howler`, `use-sound`

## Project Structure
- `src/actions/`: Service-like functions for API calls.
- `src/app/`: Page-level components and their specific sub-components (Home, Playlist).
- `src/components/`: Reusable UI components, organized by domain (player, registration, search, sidebar, song).
- `src/context/`: React Context providers.
- `src/hooks/`: Custom React hooks, including domain hooks and API utilities.
- `src/model/`: TypeScript interfaces and types for domain entities (Track, Playlist, User, etc.).
- `src/ws/`: WebSocket related logic.
- `src/utils/`: Utility functions.

## Engineering Standards

### Component Development
- Use functional components with hooks.
- Prefer MUI components and the `sx` prop for styling where possible.
- Use `styled-components` or Emotion for more complex styling needs.
- Keep components focused and modular. Large pages should be broken down into smaller content components (e.g., `HomePageContent.tsx`).

### State Management
- Use **Zustand** for transient global state like the audio player.
- Use **React Context** for stable global state like authentication.
- Prefer local state (`useState`) for component-specific logic.

### Types and Models
- Always use the models defined in `src/model/` for domain objects.
- Ensure type safety across the application; avoid using `any`.

### API and Data Fetching
- Use the custom fetching hooks/utils in `src/hooks/api/` (e.g., `secureFetch.ts`).
- Business logic for API interactions should reside in `src/actions/`.

### Naming Conventions
- **Components:** PascalCase (e.g., `TrackItem.tsx`).
- **Hooks:** camelCase starting with `use` (e.g., `usePlayer.ts`).
- **Actions/Utils:** camelCase (e.g., `authService.ts`).
- **Models:** PascalCase (e.g., `Track.ts`).

## Workflows
- **New Features:** Define types in `model/`, implement actions in `actions/`, create hooks in `hooks/`, and then build components.
- **Testing:** Add tests in `App.test.tsx` or alongside components using React Testing Library.
