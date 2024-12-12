import { AppShell, Burger, Group, MantineProvider, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AdminNavBarElements } from '../components/admin/AdminNavBarElements';
import { useState } from 'react';
import { AdminComponentKeys } from '../types/AdminComponent';
import { componentMapping } from '../components/admin/ComponentMapping';

export function OneColumnAdminLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [activeComponent, setActiveComponent] = useState<AdminComponentKeys>('Notifications');

  return (
    <MantineProvider>
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 350,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
          <Title order={3}>SnapFix</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AdminNavBarElements onSelect={setActiveComponent}/>
      </AppShell.Navbar>
      <AppShell.Main>
        {/* <Outlet/> */}
        {componentMapping[activeComponent] || <div>Selectionnez une option</div>}
        </AppShell.Main>
    </AppShell>
    </MantineProvider>
  );
}