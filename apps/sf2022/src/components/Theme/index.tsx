import { createContext, ReactNode, useContext } from "react";

type Color = [number, number, number, number];
type Theme = {
  backgroundColor: Color;
  textColor: Color;
  dividerColor: Color;
};

type ThemeContextType = {
  theme: Theme;
};
const defaultThemeContext: ThemeContextType = {
  theme: {
    backgroundColor: [240, 240, 240, 1],
    textColor: [15, 15, 15, 1],
    dividerColor: [15, 15, 15, 1],
  },
};
export const ThemeContext = createContext(defaultThemeContext);

const ThemeProvider = (props: { children?: ReactNode }) => {
  const { children } = props;

  const theme = defaultThemeContext.theme;

  return (
    <ThemeContext.Provider value={{ theme }}>
      <style type="text/css">{`:root{
        --sf-background-color:rgba(${theme.backgroundColor.join(",")});
        --sf-text-color:rgba(${theme.textColor.join(",")});
        --sf-divider-color:rgba(${theme.dividerColor.join(",")});
      }`}</style>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext).theme;
};

export default ThemeProvider;
