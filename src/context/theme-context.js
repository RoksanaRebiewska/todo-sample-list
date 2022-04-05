import React from 'react';

const ThemeContext = React.createContext({
  themeDark: true,
  toggleTheme: () => {},
});

export default ThemeContext;
