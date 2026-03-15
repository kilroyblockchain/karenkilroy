# Repository Guidelines

## Project Structure & Module Organization
`src/` holds all React modules; `App.js`, `Free2PA.js`, `LinkTree.js`, and `Resume.js` are feature-level components, with shared styles in `App.css`, `Resume.css`, and globals in `index.css`. Routing and bootstrapping live in `index.js`. Tests such as `App.test.js` reside alongside their components for easy co-location. Static assets and the HTML shell live in `public/`, while optimized production bundles are emitted to `build/`. Configuration for Tailwind (`tailwind.config.js`) and PostCSS (`postcss.config.js`) sits in the repo root.

## Build, Test, and Development Commands
- `npm start`: launches the CRA dev server with hot reloading on http://localhost:3000.
- `npm test`: runs the Jest + Testing Library suite in watch mode; press `a` to run everything.
- `npm run build`: produces a minified production bundle within `build/`.
- `npm run eject`: copies the underlying CRA configuration locally; only run after discussion because it cannot be undone.

## Coding Style & Naming Conventions
Use modern React with function components and hooks; prefer descriptive component names in PascalCase (e.g., `Free2PA`). Keep files camelCase or PascalCase to mirror the exported component. Follow the default CRA ESLint config plus Testing Library lint rules. Indent with two spaces in JSX and JS, and keep imports sorted roughly by library → local. Tailwind utility classes belong in `className`, while shared CSS that cannot be expressed with utilities should stay in the matching `.css` file. Avoid inline style objects when a utility or class can express the requirement.

## Testing Guidelines
Testing relies on Jest, `@testing-library/react`, and `@testing-library/jest-dom`. Each component should ship a neighboring `*.test.js` that exercises user-facing behavior (avoid snapshot-only tests). Prefer screen queries such as `screen.getByRole` and include accessibility roles. Run `npm test -- --coverage` before PRs if the change is non-trivial, and keep coverage from regressing in critical components (`App`, `Free2PA`, `LinkTree`).

## Commit & Pull Request Guidelines
Recent history favors short, imperative subjects (`free2pa exercises`). Follow the same format: lowercase, ≤60 characters, describe the outcome (“add resume hero copy”). For pull requests, include context, screenshots of new UI states, links to related issues, and explicit testing notes (commands run, browsers checked). Request review before merging; do not merge failing CI.

## Configuration & Environment
Tailwind scans `src/**/*.{js,jsx}`; update `tailwind.config.js` when adding new directories. Secrets stay outside the repo—use `.env.local` for per-developer values and document any required keys in the PR. After dependency updates, run `npm ci` to reproduce the exact lockfile state before committing.
