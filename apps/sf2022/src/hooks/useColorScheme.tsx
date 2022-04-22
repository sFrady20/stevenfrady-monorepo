const useColorScheme = () =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";
export default useColorScheme;
