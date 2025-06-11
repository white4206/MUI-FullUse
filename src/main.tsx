import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
import '@/theme/index.css';
import '@/i18n'; // i18国际化
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <App />
        </StrictMode>
    </BrowserRouter>
);
