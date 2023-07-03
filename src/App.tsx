import { BrowserRouter, Routes, Route } from "react-router-dom";

// UI
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

// PAGES
import { Base } from "./pages/Base";
import { MapPage } from "./pages/MapPage";
import { DeviceGridPage } from "./pages/DeviceGridPage";
import { DevicePage } from "./pages/DevicePage";
import { SetupModal } from "./components/setup/SetupModal";
import { SetupBase } from "./pages/SetupBase";
import { SetSitePage } from "./pages/SetSitePage";
import { useState } from "react";

function App() {
  const [defaultTimer] = useState(3000);

  return (
    <>
      <ColorModeScript />
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                localStorage.getItem("site") ? <Base /> : <SetSitePage />
              }
            >
              <Route element={<SetupModal />}>
                <Route
                  path="/"
                  element={<MapPage defaultTimer={defaultTimer} />}
                />
                <Route
                  path="/device-grid"
                  element={<DeviceGridPage defaultTimer={defaultTimer} />}
                />
                <Route
                  path="/device-grid/:type/:macAddress"
                  element={<DevicePage defaultTimer={defaultTimer} />}
                />
              </Route>
            </Route>
            <Route path="/setup" element={<SetupBase />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
