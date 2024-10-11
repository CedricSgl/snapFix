import { AppShell, Container, MantineProvider } from "@mantine/core";
import { Header } from "../components/header/Header";
import { ImmoCard } from "../components/core/ImmoCard";


export function OneColumnLayout(){
    return(
        <MantineProvider>
      <Container>
            <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm' }}
            padding="md"
          >
            <AppShell.Header>
      <Header />

            </AppShell.Header>
      <ImmoCard id={'1'} />
          </AppShell>
          </Container>
    </MantineProvider>
    )
}