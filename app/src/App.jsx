import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Dpools from "./pages/Dpools";
import DPoolInteraction from "./pages/DPoolInteraction";
import Dcards from "./pages/Dcards";
import Ccards from "./pages/Ccards";
import Cpools from "./pages/Cpools";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<AllApps />} />
        <Route path="/pools" element={<DPoolInteraction />} />
        <Route path="/Dcards" element={<Dcards />} />
        <Route path="/Ccards" element={<Ccards />} />
        <Route path="/Dpools" element={<Dpools />} />
        <Route path="/Cpools" element={<Cpools />} />
        <Route path="/DPoolInteraction" element={<DPoolInteraction/>} />
      </Routes>
    </RootLayout>
  );
};

export default App;
