import { Box, Button, Textarea, TextInput, Title } from "@mantine/core";

export function Form() {
  return (
    <Box mt="xl">
      <Title order={3}>Get in touch</Title>
      <Box bd="1px solid gray.5" px="20px" pb="20px" style={{"border-radius": "10px"}} mt="25">
        <TextInput label="Name" placeholder="Value" required mt="md" />
        <TextInput label="Surname" placeholder="Value" required mt="md" />
        <TextInput label="Email" placeholder="Value" required mt="md" />
        <Textarea label="Message" placeholder="Value" required mt="md" />
        <Button fullWidth mt="md" color="gray">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
