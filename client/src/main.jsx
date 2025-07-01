import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { appStore } from "./app/store.js";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { useLoadUserQuery } from "./features/api/authApi.js";
import "./index.css";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner /> : <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={appStore}>
        <Custom>
          <App />
          <Toaster />
        </Custom>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
