const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

const ROOT = path.join(__dirname, '..');

// 1. Serve Master Portfolio at Root
const masterDist = path.join(ROOT, 'master-portfolio-showcase', 'dist');
if (fs.existsSync(masterDist)) {
    app.use(express.static(masterDist));
}

// 2. Serve Projects
const projects = [
    "micro-portfolio-generator", "offline-events-pwa", "recipe-remix-engine",
    "accessible-quiz-builder", "css-theme-playground", "ecommerce-ux-sandbox",
    "collaborative-cv-studio", "generative-ui-pattern-engine", "privacy-first-analytics",
    "micro-mentorship-pwa", "wasm-image-processing", "verifiable-content-platform"
];

projects.forEach(p => {
    const dist = path.join(ROOT, p, 'dist');
    if (fs.existsSync(dist)) {
        console.log(`Mapping /projects/${p} -> ${dist}`);
        app.use(`/projects/${p}`, express.static(dist));
    }
});

// 3. Fallback
app.get('*', (req, res) => {
    if (fs.existsSync(path.join(masterDist, 'index.html'))) {
        res.sendFile(path.join(masterDist, 'index.html'));
    } else {
        res.send('<h1>System Building...</h1><p>Please wait and refresh.</p>');
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
