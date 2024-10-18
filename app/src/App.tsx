import '@mantine/core/styles.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OneColumnLayout } from './layout/OneColumnLayout';
import Product from './pages/Product';
import ImmoRegistration from './pages/ImmoRegistration'; // ????? 
// import { AppShell, Container, MantineProvider } from '@mantine/core';
// import { Header } from './components/header/Header';
// import { ImmoCard } from './components/core/ImmoCard';
/*
let headerButtons = [
  {title : 'Products',
    type : 'default',
    action : ''
  },{title : 'Sign in',
    type : 'default',
    action : ''
  },{title : 'Register',
    type : 'default',
    action : ''
  }
]
*/

/*
let datas = {
  title: 'Mon Titre',
  buttonProducts: 'Products',
  buttonSignIn: 'Sign in',
  buttonRegister: 'Register'
}
*/
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OneColumnLayout/>}>
          <Route path="/product/:id" element={<Product/>}/>
        </Route>
        <Route path="/" element={<OneColumnLayout/>}>
          <Route path="/registerImmo" element={<ImmoRegistration/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
