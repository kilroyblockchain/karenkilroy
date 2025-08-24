import React, { useEffect } from 'react';
import App from './App.js';

/**
 * Renders the same resume and auto-opens the print dialog.
 * After printing, it navigates back so the user returns to "/" cleanly.
 */
export default function PrintPage() {
    useEffect(() => {
        const t = setTimeout(() => window.print(), 50);
        const handleAfterPrint = () => {
            if (window.history.length > 1) window.history.back();
        };
        window.addEventListener('afterprint', handleAfterPrint);
        return () => {
            clearTimeout(t);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, []);

    return <App />;
}
