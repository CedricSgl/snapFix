import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import { OneColumnLayout } from "./layout/OneColumnLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OneColumnLayout/>}>
          <Route path="/product" element={<Product/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
