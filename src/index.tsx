/* eslint-disable import/order */
import './suppressResizeObserverError';  // DONT REORDER IMPORTS HERE... THIS MUST BE THE FIRST IMPORT
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
