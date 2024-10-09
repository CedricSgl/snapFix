import { Box, Button, Grid, Text, TextInput } from "@mantine/core";

export function Newsletter() {
  return (
    <Box mt="xl" mb="xl">
      <Text size="lg" ta="center">Follow the latest trends</Text>
      <Text size="sm" ta="center" color="dimmed" mb="md">
        With our daily newsletter
      </Text>
      <Grid justify="center">
        <Grid.Col span={6}>
          <TextInput placeholder="you@example.com" />
        </Grid.Col>
        <Grid.Col span={2}>
          <Button fullWidth color="black">Submit</Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
