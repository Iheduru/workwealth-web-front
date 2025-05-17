
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import { Toaster as Sonner } from './components/ui/sonner'
import * as serviceWorker from './serviceWorker'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system">
    <App />
    <Toaster />
    <Sonner />
  </ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
