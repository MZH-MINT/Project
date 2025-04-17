import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeToggleContext = createContext(() => {});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Resets background and text for dark/light mode */}
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
