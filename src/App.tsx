import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Settings } from "./components/Settings";
import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<SideBar onOpenSettings={() => setSettingsOpen(true)} />}
        />
      </Routes>
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </BrowserRouter>
  );
}

export default App;
