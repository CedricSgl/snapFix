import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import { OneColumnLayout } from "./layout/OneColumnLayout";
import Users from "./pages/Users";
import { AuthProvider } from "./context/AuthContext";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { OneColumnAdminLayout } from "./layout/OneColumnAdminLayout";
import Buildings from "./components/admin/Buildings";
import Admin from "./pages/Admin";

function App() {

  console.log("App component rendered"); // Ajoute un log pour vérifier que App est bien monté

  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OneColumnLayout />}>
            <Route path="/product" element={<Product />} />
            <Route path="/users" element={<Users />} />
            <Route path="/buildings" element={<Buildings />} />
            
          </Route>
          <Route path="/admin" element={<OneColumnAdminLayout/>}>
            <Route path="/admin/dash" element={<Admin />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;