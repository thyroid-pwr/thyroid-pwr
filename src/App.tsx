import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { Page3 } from "./pages/Page3";
import { ShowXAI } from "./pages/ShowXAI";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/architecture" element={<Page3 />} />
          <Route path="/showxai" element={<ShowXAI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
