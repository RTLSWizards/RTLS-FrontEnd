import { BrowserRouter, Routes, Route } from "react-router-dom";

// UI
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

// PAGES
import { Base } from "./pages/Base";
import { MapPage } from "./pages/MapPage";
import { DeviceGridPage } from "./pages/DeviceGridPage";
import { DevicePage } from "./pages/DevicePage";

function App() {
  return (
    <>
      <ColorModeScript />
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Base />}>
              <Route path="/" element={<MapPage />} />
              <Route path="/device-grid" element={<DeviceGridPage />} />
              <Route
                path="/device-grid/:type/:macAddress"
                element={<DevicePage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
