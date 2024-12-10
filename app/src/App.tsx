import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import { OneColumnLayout } from "./layout/OneColumnLayout";
import Users from "./pages/Users";
import { AuthProvider } from "./context/AuthContext";
import { OneColumnAdminLayout } from "./layout/OneColumnAdminLayout";
import Buildings from "./components/admin/Buildings";
import Admin from "./pages/Admin";

// (AJOUT)
import { LoginPage } from "./pages/LoginPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import AdminPage from "./pages/AdminPage";
import ClientPage from "./pages/ClientPage";
import PrestatairePage from "./pages/PrestatairePage";

function App() {
  console.log("App component rendered");

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OneColumnLayout />}>
            <Route path="/product" element={<Product />} />
            <Route path="/users" element={<Users />} />
            <Route path="/buildings" element={<Buildings />} />
          </Route>

          {/* Route d'authentification (AJOUT) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Layout Admin existant */}
          <Route path="/admin" element={<OneColumnAdminLayout />}>
            <Route path="/admin/dash" element={<Admin />} />
          </Route>

          {/* Pages par rôle (AJOUT) */}
          <Route path="/superadmin" element={<SuperAdminPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/prestataire" element={<PrestatairePage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
