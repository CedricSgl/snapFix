import { Box, TextInput, Title } from "@mantine/core";


export function AdminDashboard(){
    return (
    <Box mt="xl">
      <Title order={3}>First draft Admin Dashboard</Title>
      <Box bd="1px solid gray.5" px="20px" pb="20px" style={{"border-radius": "10px"}} mt="25">
        <TextInput label="Name" placeholder="Value" required mt="md" />
        
      </Box>
    </Box>
  );
}

