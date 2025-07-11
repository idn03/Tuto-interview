import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextProps {
    fonts: {
        regular: string;
        medium: string;
        bold: string;
    };
    fontSizes: {
        small: number;
        regular: number;
        medium: number;
        large: number;
        xlarge: number;
    };
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        textLight: string;
        border: string;
    };
}

const defaultTheme: ThemeContextProps = {
    fonts: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
    },
    fontSizes: {
        small: 12,
        regular: 14,
        medium: 16,
        large: 18,
        xlarge: 20,
    },
    colors: {
        primary: '#555879',
        secondary: '#98A1BC',
        background: '#EEEEEE',
        text: '#0C0C0C',
        textLight: '#0C0C0C80',
        border: '#E5E5E5',
    },
};

const ThemeContext = createContext<ThemeContextProps>(defaultTheme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}; 