import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router";
import "./index.css";

import { NotificationContainer } from "./components/NotificationContainer";
import { AppProvider } from "./contexts";
import PageRoutes from "./routes";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <PageRoutes />
        <NotificationContainer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
