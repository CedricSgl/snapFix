import { AppShell, Container, MantineProvider } from "@mantine/core";
import { Topbar } from "../components/Topbar";
import { Outlet } from "react-router-dom";

export function OneColumnLayout() {
  return (
    <MantineProvider>
      <Container>
        <AppShell header={{ height: 75 }} padding="md">
          <AppShell.Header>
            <Topbar />
          </AppShell.Header>

          <AppShell.Main>
            <Outlet/>
          </AppShell.Main>
        </AppShell>
      </Container>
    </MantineProvider>
  );
}
