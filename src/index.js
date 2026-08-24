import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.js';
import Resume from './Resume.js';
import MobilityResume from './MobilityResume.js';
import DeloitteTrustworthyAIResume from './DeloitteTrustworthyAIResume.js';
import WalmartAgenticResume from './WalmartAgenticResume.js';
import WalmartResumeBrief from './WalmartResumeBrief.js';
import LinkTree from './LinkTree.js';
import Free2PA from './Free2PA.js';
import Skills from './Skills.js';

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
                    <Route path="/resume-mobility" element={<MobilityResume />} />
                    <Route path="/resume-deloitte-ai" element={<DeloitteTrustworthyAIResume />} />
                    <Route path="/resume-walmart" element={<WalmartAgenticResume />} />
                    <Route path="/resume-walmart-brief" element={<WalmartResumeBrief />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/links" element={<LinkTree />} />
                    <Route path="/free2pa" element={<Free2PA />} />
                    <Route path="*" element={<App />} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>
);
