import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.js';
import Resume from './Resume.js';

function ErrorBoundary({ children }) {
    try { return children; } catch (e) {
        console.error(e);
        return <pre style={{ padding: 16, color: '#b91c1c' }}>Render error: {String(e)}</pre>;
    }
}

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="*" element={<App />} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>
);
