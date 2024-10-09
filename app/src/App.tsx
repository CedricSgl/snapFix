import "@mantine/core/styles.css";

import { AppShell, Container, MantineProvider } from "@mantine/core";

import { Topbar } from "./components/Topbar";
import { Immo } from "./components/Immo";
import { Form } from "./components/Form";
import { Newsletter } from "./components/Newsletter";

function App() {
  return (
    <MantineProvider>
      <Container>
        <AppShell header={{ height: 75 }} padding="md">
          <AppShell.Header>
            <Topbar />
          </AppShell.Header>

          <AppShell.Main>
            <Immo />

            {/* Contact form */}
            <Form />

            {/* Newsletter */}
            <Newsletter />
          </AppShell.Main>
        </AppShell>
      </Container>
    </MantineProvider>
  );
}

export default App;
