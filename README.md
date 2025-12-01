# GasistaPro - Demo Frontend (Mobile-First)

This is a technical demo application for gas installation calculations, designed with a mobile-first approach. It allows users to input details for multiple gas pipeline segments (tramos), calculates recommended pipe diameters based on a technical table, visualizes consumption, and provides a canvas for drawing installation plans.

## Features

*   **Multi-Tramo Calculation:** Process multiple gas pipeline segments independently, including special handling for "Medidor" (meter) segments.
*   **Technical Table Lookup:** Dynamically determines provisional and definitive pipe diameters using "Tabla Nº3" based on distance and consumption.
*   **Input Normalization:** Automatically handles numeric inputs with commas or periods.
*   **Interactive Input Form:** Add, update, and remove tramos with real-time feedback.
*   **Result Display:** Clearly presents calculated diameters, distances, and consumption for each tramo, along with total installation consumption.
*   **Consumption Chart:** Visualizes gas consumption per tramo using `react-chartjs-2`.
*   **Pipe Visualization:** Simple SVG preview of the pipe based on the calculated diameter.
*   **Interactive Canvas:** Draw and annotate installation plans using Fabric.js, with tools for brush, lines, points, text, erase, clear, and saving as PNG.
*   **Persistent History:** Stores the last 3 calculation results in local storage.
*   **Mobile-First Responsive UI:** Optimized for mobile screens with adaptive layouts for desktop.

## Technical Stack

*   **Frontend Framework:** React.js
*   **Build Tool:** Vite
*   **State Management:** Zustand (with localStorage persistence)
*   **Charting Library:** Chart.js (via react-chartjs-2)
*   **Canvas Drawing:** Fabric.js
*   **Icons:** React Icons
*   **Testing:** Vitest, JSDOM, Testing Library (React, Jest-DOM)
*   **Styling:** Pure CSS (mobile-first, variables)

## Project Structure

```
gasistapro-demo/
├─ .github/
│ └─ workflows/ci.yml
├─ public/
│ └─ ... (standard Vite public assets)
├─ src/
│ ├─ assets/
│ │ └─ icons/ (svg/png recommended)
│ ├─ components/
│ │ ├─ Header.jsx
│ │ ├─ InputForm.jsx
│ │ ├─ ArtifactList.jsx
│ │ ├─ ResultCard.jsx
│ │ ├─ ChartResult.jsx
│ │ ├─ PipePreview.jsx
│ │ └─ CanvasPlan.jsx
│ ├─ data/
│ │ └─ tablaCanos.json  (Contains "Tabla Nº3" data)
│ ├─ hooks/
│ │ └─ useStore.js      (Zustand store for global state)
│ ├─ logic/
│ │ └─ calcularCañeria.js (Core calculation logic: normalize, lookup, process tramos)
│ ├─ pages/
│ │ └─ Home.jsx         (Main page assembling all components)
│ ├─ styles/
│ │ └─ variables.css    (CSS variables)
│ ├─ App.jsx
│ └─ main.jsx
├─ tests/
│ ├─ calcularCañeria.spec.js
│ └─ store.spec.js
├─ .gitignore
├─ package.json
├─ vite.config.js
└─ README.md
```

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPO_URL>
    cd gasistapro-demo
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run preview`: Serves the `dist` folder locally for production testing.
*   `npm test`: Runs unit tests using Vitest.
*   `npm test:watch`: Runs unit tests in watch mode.

## Testing

Unit tests are located in the `tests/` directory and cover the core calculation logic and Zustand store.

## Deployment

### Vercel

1.  Create an account on [vercel.com](https://vercel.com/).
2.  From your Vercel dashboard, click "Add New..." then "Project".
3.  Choose "Import Git Repository" and select your GitHub repository.
4.  Vercel should auto-detect Vite. Ensure the build command is `npm run build` and the output directory is `dist`.
5.  Click "Deploy". Vercel will build and provide a public URL.

### Netlify

1.  Create an account on [netlify.com](https://www.netlify.com/).
2.  From your Netlify dashboard, click "Add new site" then "Import an existing project".
3.  Connect your GitHub account and select your repository.
4.  Netlify should auto-detect Vite. Ensure the build command is `npm run build` and the publish directory is `dist`.
5.  Click "Deploy site". Netlify will build and provide a public URL.

## Git Workflow

This project follows a feature-branch workflow:

1.  **`main` branch:** Stable, production-ready code (mirrors deployed version).
2.  **`develop` branch:** Integrates new features for continuous development.
3.  **`feature/your-feature-name` branches:** Created from `develop` for individual features or bug fixes.
    *   Work on your feature branch, making logical and descriptive commits.
    *   Push your feature branch to the remote.
    *   Open a Pull Request (PR) from your `feature/` branch to `develop` for review and integration.
4.  **`release/demo-1` branch:** Created from `develop` when a version is ready for a demo or specific release. Deployments are often made from these branches.
    *   After successful deployment from a `release/` branch, merge it into `main` and tag the release.

## Para tu papá (brief explanation for non-technical audience)

¡Hola! Esta app, "GasistaPro Demo", te ayuda a calcular qué tamaño de caño de gas necesitas para tu casa o negocio.

1.  **Ingresas los datos:** Le decís cuántos metros mide cada tramo de cañería y cuánto gas consume cada artefacto (cocina, calefón, etc.).
2.  **La app calcula:** Con esa información y una tabla técnica, te dice automáticamente qué diámetro de caño es el más adecuado para cada parte de la instalación.
3.  **Puedes dibujar:** ¡Y hasta puedes hacer un pequeño "croquis" o plano de cómo irán los caños para tener una idea más clara!

Es como tener un ayudante digital para asegurarte de que la instalación de gas sea segura y funcione bien.