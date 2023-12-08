import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dpools from "./pages/Dpools";
import DPoolInteraction from "./pages/DPoolInteraction";
import Dcards from "./pages/Dcards";
import Ccards from "./pages/Ccards";
import Cpools from "./pages/Cpools";
import CreatePoolForm from "./pages/CreatePoolForm";
import CPoolInteraction from "./pages/CPoolInteraction";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Cpools />} />
        <Route path="/Dcards" element={<Dcards />} />
        <Route path="/Ccards" element={<Ccards />} />
        <Route path="/Dpools" element={<Dpools />} />
        <Route path="/Cpools" element={<Cpools />} />
        <Route path="/CPoolInteraction" element={<CPoolInteraction />} />
        <Route path="/DPoolInteraction/:addr" element={<DPoolInteraction/>} />
        <Route path="/create" element={<CreatePoolForm/>} />
      </Routes>
    </RootLayout>
  );
};

export default App;
