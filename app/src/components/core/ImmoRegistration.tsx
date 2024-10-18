import { Button, Group, NumberInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { baseUrl } from "../../config";



export default function ImmoRegistration(){
    const form = useForm({
        mode: 'controlled',
        initialValues: {title: '', price : '0', description :''}
    });

    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null); 

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(submittedValues),
        };
        fetch(`${baseUrl}/record/register`, requestOptions).then((response) => response.json())
    },[submittedValues])

    return (
        <>
        <form onSubmit={form.onSubmit(setSubmittedValues)}>
            <TextInput label='Title' key={form.key('title')}
            {...form.getInputProps('title')}/>
            <Textarea label='Description' key={form.key('description')}
            {...form.getInputProps('description')}/>
            <NumberInput label="Price" key={form.key('price')}
            {...form.getInputProps('price')}/>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
        </>
    )
}