import { Box, Button, Space, Textarea, TextInput, Title } from "@mantine/core";


export function ContactRegistration(){
    return (
        <Box>
            <Space h="md" />
            <Title order={3} >Get in touch</Title>
            <Box bd="1px solid gray.5" px="20px" pb="20px" style={{"border-radius": "10px"}} mt="25">
                <TextInput label="Name" placeholder="Input placeholder" />
                <TextInput label="SurName" placeholder="Input placeholder" />
                <TextInput label="Email" placeholder="Input placeholder" />
                <Textarea label="Message" placeholder="Input placeholder" />
                <Button fullWidth mt="md" color="gray">Submit</Button>
            </Box>
        </Box>
    )
}