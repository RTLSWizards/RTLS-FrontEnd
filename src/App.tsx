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

function App() {
  console.log(localStorage.getItem("site"));

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
                <Route path="/" element={<MapPage />} />
                <Route path="/device-grid" element={<DeviceGridPage />} />
                <Route
                  path="/device-grid/:type/:macAddress"
                  element={<DevicePage />}
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
