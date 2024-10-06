import "@mantine/core/styles.css";

import {
  AppShell,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Image,
  MantineProvider,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

import { Topbar } from "./components/Topbar";
import { Description } from "./components/Description";

function App() {
  return (
    <MantineProvider>
      <Container>
        <AppShell header={{ height: 75 }} padding="md">
          <AppShell.Header>
            <Topbar />
          </AppShell.Header>

          <AppShell.Main>
            <Grid>
              <Grid.Col span={6}>
                <Card shadow="sm" padding="lg">
                  <Image
                    src="https://via.placeholder.com/300x200"
                    alt="Product"
                    height={200}
                    fit="contain"
                  />
                </Card>
              </Grid.Col>

              <Grid.Col span={6}>
                <Description
                  title="Mon titre"
                  text="Mon texte"
                  price="200"
                  badges={[{ text: "New", color: "green" }, { text: "Eco", color: "green" }]}
                />
              </Grid.Col>
            </Grid>

            {/* Contact form */}
            <Box mt="xl">
              <Title order={3}>Get in touch</Title>
              <TextInput label="Name" placeholder="Value" required mt="md" />
              <TextInput label="Surname" placeholder="Value" required mt="md" />
              <TextInput label="Email" placeholder="Value" required mt="md" />
              <Textarea label="Message" placeholder="Value" required mt="md" />
              <Button fullWidth mt="md">
                Submit
              </Button>
            </Box>

            {/* Newsletter */}
            <Box mt="xl" mb="xl">
              <Text size="lg">Follow the latest trends</Text>
              <Text size="sm" color="dimmed" mb="md">
                With our daily newsletter
              </Text>
              <Grid justify="center">
                <Grid.Col span={6}>
                  <TextInput placeholder="you@example.com" />
                </Grid.Col>
                <Grid.Col span={2}>
                  <Button fullWidth>Submit</Button>
                </Grid.Col>
              </Grid>
            </Box>
          </AppShell.Main>
        </AppShell>
      </Container>
    </MantineProvider>
  );
}

export default App;
