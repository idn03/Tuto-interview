import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Router from './Router';

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <Router />
                <StatusBar style="auto" />
            </LanguageProvider>
        </ThemeProvider>
    );
}
