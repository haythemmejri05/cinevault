# CineVault — React & Next.js Hands-On Lab

> Movie watchlist app · 7–8 hours · One simple example of every React/Next.js concept

**App in one sentence:** Browse trending movies (TMDB free API), search titles, add to a personal watchlist, and rate films — all in a simple, clean UI.

**No database. No auth. No fancy design.** Just the patterns.

---

## Setup (~30 min)

- [x] `npm create vite@latest cinevault -- --template react-ts`
- [x] Install Tailwind CSS v4 and configure it
- [x] Install ESLint (`@typescript-eslint`, `eslint-plugin-react-hooks`)
- [x] Install Prettier, add `.prettierrc`, wire to ESLint with `eslint-config-prettier`
- [x] Configure `tsconfig.json` — strict mode, path alias `@/` → `src/`
- [x] Configure `vite.config.ts` with the same `@/` alias
- [x] Install dependencies: `react-router-dom @reduxjs/toolkit react-redux`
- [x] Create `.env` with `VITE_TMDB_API_KEY=your_key` (register free at themoviedb.org)
- [x] Add `.vscode/settings.json` — format on save, ESLint auto-fix
- [x] Create folder structure:
  ```
  src/
  ├── api/        # TMDB fetch functions
  ├── components/ # Shared UI components
  ├── context/    # React Context
  ├── hooks/      # Custom hooks
  ├── hoc/        # Higher-Order Components
  ├── pages/      # Route-level pages
  ├── store/      # Redux store & slices
  └── types/      # TypeScript interfaces
  ```
- [x] Init git, add `.gitignore`, first commit

---

## Types & API Layer (~20 min)

- [x] Define interfaces in `src/types/index.ts`: `Movie`, `MovieDetail`, `WatchlistItem`
- [x] Create `src/api/tmdb.ts` with a base fetch wrapper (includes error handling + AbortController)
- [x] Add `getTrending()`, `searchMovies(query)`, `getMovieDetail(id)`

---

## Redux Store (~30 min)

- [x] Create `src/store/index.ts` — `configureStore` with typed `RootState` + `AppDispatch`
- [x] Create `watchlistSlice.ts` — actions: `add`, `remove` · persisted to `localStorage`
- [x] Create `ratingsSlice.ts` — actions: `setRating` · state: `Record<number, number>`
- [x] Create typed hooks in `src/hooks/redux.ts`: `useAppSelector`, `useAppDispatch`

---

## Context API (~20 min)

- [ ] Create `src/context/ThemeContext.tsx` — `theme: 'light' | 'dark'`, `toggleTheme()`
- [ ] Wire Tailwind `darkMode: 'class'` to the context toggle
- [ ] Create `useTheme()` custom hook consuming the context
- [ ] Wrap app in `<ThemeProvider>` in `main.tsx`

---

## Custom Hooks (~30 min)

- [ ] `useDebounce<T>(value, delay)` — debounces search input
- [ ] `useFetch<T>(fetchFn, deps)` — generic loader with `data`, `loading`, `error` states; cleanup with AbortController in `useEffect`
- [ ] `useLocalStorage<T>(key, initial)` — synced localStorage state
- [ ] `useClickOutside(ref, callback)` — detects outside clicks (used for dropdown/modal)

---

## Components (~1.5 hours)

### Shared

- [ ] `Button.tsx` — props: `variant` (primary/ghost), `onClick`, `disabled`, `loading`
- [ ] `Input.tsx` — controlled component; `forwardRef` so parent can call `.focus()`
- [ ] `Spinner.tsx` — simple loading indicator for Suspense fallbacks
- [ ] `ErrorFallback.tsx` — displayed by Error Boundary; shows message + retry button

### Movie-specific

- [ ] `MovieCard.tsx` — poster, title, rating, watchlist toggle; wrapped in `React.memo`
- [ ] `MovieGrid.tsx` — renders a list of `MovieCard`; prop-drills `onCardClick` down
- [ ] `StarRating.tsx` — **controlled** component (value from Redux); calls `onRate(score)` prop back to parent
- [ ] `SearchInput.tsx` — **uncontrolled** component using `useRef`; exposes `focus()` + `clear()` via `useImperativeHandle`

---

## HOC (~20 min)

- [ ] `withLogger.tsx` — logs component name + render count to console (simple analytics example)
- [ ] `withErrorBoundary.tsx` — wraps any component in a class-based `ErrorBoundary`; accepts a `FallbackComponent` prop
  > Note: `ErrorBoundary` must be a class component (`componentDidCatch` + `getDerivedStateFromError`)
- [ ] Apply `withErrorBoundary(MovieGrid, ErrorFallback)` in `HomePage`

---

## Pages & Routing (~1 hour)

- [ ] Set up routes in `src/router.tsx` using `createBrowserRouter`:
  - `/` → `HomePage` (lazy)
  - `/search` → `SearchPage` (lazy)
  - `/movie/:id` → `MovieDetailPage` (lazy)
  - `/watchlist` → `WatchlistPage` (lazy)
  - `*` → `NotFoundPage`
- [ ] Lazy-load all pages with `React.lazy()` + wrap router in `<Suspense fallback={<Spinner />}>`
- [ ] `Navbar.tsx` — links to all routes + theme toggle button + watchlist count badge

### HomePage

- [ ] Fetch trending movies on mount with `useEffect` + dispatch to Redux
- [ ] Filter by genre — `GenreFilter` lifts `selectedGenre` state up to `HomePage` via callback prop
- [ ] Pass `selectedGenre` down to `MovieGrid` (prop drilling: `HomePage → MovieGrid → MovieCard`)
- [ ] Memoize filtered list with `useMemo`; memoize handlers with `useCallback`

### SearchPage

- [ ] Auto-focus `SearchInput` on mount via `useRef` (call `searchRef.current.focus()`)
- [ ] Debounce input with `useDebounce` → call `searchMovies` API
- [ ] Display results in `MovieGrid`

### MovieDetailPage

- [ ] Fetch movie detail on mount with `useEffect`; cancel request on unmount (AbortController)
- [ ] `StarRating` is a controlled component — value from `ratingsSlice`; calls `onRate` → dispatches `setRating`
- [ ] Add/remove watchlist button dispatches to `watchlistSlice`
- [ ] Lazy-load a `SimilarMovies` section with its own `<Suspense>` boundary inside the page

### WatchlistPage

- [ ] Read from Redux `watchlistSlice`; display saved movies
- [ ] Each item shows user's rating from `ratingsSlice`
- [ ] Remove button dispatches `remove`
- [ ] Show empty state with link to Home if watchlist is empty

---

## Advanced Patterns Checklist (~30 min)

> These are woven into the components above — use this to verify you've hit each one

- [ ] `useEffect` — data fetching in `MovieDetailPage`, cleanup on unmount
- [ ] `useRef` — auto-focus in `SearchPage`, tracking previous value in `SearchPage`
- [ ] `forwardRef` — `Input.tsx` exposes ref to parent
- [ ] `useImperativeHandle` — `SearchInput.tsx` exposes `{ focus, clear }` to `SearchPage`
- [ ] `React.memo` — `MovieCard.tsx`
- [ ] `useCallback` — `HomePage` handlers passed as props to children
- [ ] `useMemo` — filtered/sorted movie list in `HomePage`
- [ ] `useContext` — `useTheme()` hook used in `Navbar`
- [ ] Context API — `ThemeContext` + `ThemeProvider`
- [ ] Prop drilling — `selectedGenre` flows `HomePage → MovieGrid → MovieCard`
- [ ] Lifting state up — `GenreFilter` calls `onGenreChange(genre)` → `HomePage` owns the state
- [ ] Child → parent callback — `StarRating` calls `onRate(score)` → `MovieDetailPage` dispatches it
- [ ] Controlled component — `StarRating` (value = Redux state)
- [ ] Uncontrolled component — `SearchInput` (value via `useRef`)
- [ ] HOC — `withLogger`, `withErrorBoundary`
- [ ] Error Boundary — class component wrapping `MovieGrid` and `MovieDetailPage`
- [ ] `React.lazy` + `Suspense` — all pages + `SimilarMovies` section
- [ ] Custom hooks — `useDebounce`, `useFetch`, `useLocalStorage`, `useClickOutside`
- [ ] Redux — `watchlistSlice`, `ratingsSlice` consumed across pages
- [ ] React Router — all 5 routes, `useParams` in `MovieDetailPage`, `useNavigate` in `NotFoundPage`
- [ ] Component composition — `MovieDetailPage` composes `StarRating`, `MovieGrid`, `SimilarMovies`
- [ ] Code splitting — verified in `dist/` (each page is a separate `.js` chunk)

---

## Next.js (~45 min)

> Separate project — `npx create-next-app@latest cinevault-next --typescript --tailwind --app`

- [ ] Migrate `HomePage` as an `async` Server Component — fetch trending with no `useEffect`
- [ ] Migrate `MovieDetailPage` — use `generateMetadata(params)` for page title
- [ ] Add `loading.tsx` per route segment (replaces manual Suspense)
- [ ] Add `error.tsx` per route segment (replaces manual Error Boundary)
- [ ] Mark `StarRating` and `Navbar` as `'use client'` — understand the server/client boundary
- [ ] Create `app/api/search/route.ts` Route Handler as a TMDB proxy (hides API key server-side)
- [ ] Use `next/image` for movie posters, `next/link` for all internal links

---

## Profiling & Debugging (~30 min)

- [ ] Open React DevTools → **Profiler** tab → record a `HomePage` render
- [ ] Use **Flamegraph** to identify the slowest component
- [ ] Enable "Highlight updates when components render" — watch `MovieCard` before/after `React.memo`
- [ ] Add a `debugger` statement inside `useFetch` — step through in Chrome DevTools Sources
- [ ] Add `.vscode/launch.json` for VS Code Chrome debugger attach — set a breakpoint in `HomePage`
- [ ] Open Redux DevTools — time-travel through watchlist add/remove actions
- [ ] Run `npx vite-bundle-visualizer` — confirm pages are split into separate chunks

---

## Final Polish & GitHub (~20 min)

- [ ] `npm run lint` — fix all errors
- [ ] `npm run build` — zero TypeScript errors, zero warnings
- [ ] Update `README.md` — setup steps, `.env` instructions, concept index
- [ ] Create GitHub repo → `git push origin main`
- [ ] Add `.github/workflows/ci.yml` — runs `lint` + `build` on every push

---

## Time Budget

| Phase                      | Time                |
| -------------------------- | ------------------- |
| Setup                      | 30 min              |
| Types & API                | 20 min              |
| Redux                      | 30 min              |
| Context                    | 20 min              |
| Custom Hooks               | 30 min              |
| Components                 | 90 min              |
| HOC                        | 20 min              |
| Pages & Routing            | 60 min              |
| Advanced Patterns (verify) | 30 min              |
| Next.js                    | 45 min              |
| Profiling & Debugging      | 30 min              |
| Final Polish & GitHub      | 20 min              |
| **Total**                  | **~7 hours 25 min** |
