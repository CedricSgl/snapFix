import '@mantine/core/styles.css';

import { AppShell, Container, MantineProvider } from '@mantine/core';
import { Header } from './components/header/Header';
import { ImmoCard } from './components/core/ImmoCard';
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

/*coucou mani*/ 

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
    <MantineProvider>
      <Container>
            <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm' }}
            padding="md"
          >

      <Header />
      <ImmoCard id={'67019a2195b33fac480963b2'} />
          </AppShell>
          </Container>
    </MantineProvider>
  )
}

export default App
