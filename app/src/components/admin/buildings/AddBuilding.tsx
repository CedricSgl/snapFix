import { Button, FileButton, Group, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { baseUrl } from '../../../config';


export default function AddBuilding(){
    const [files, setFiles] = useState<File[]>([]);

    const form = useForm({
    mode: "controlled",
    initialValues: {
        name:'',
        address:'',
        responsible:''

    },
    /*validate: {
      email: isEmail("Invalid email"),
    },*/
  });
  
  interface BuildingFormValues {
    name: string;
    address: string;
    responsible: string;
  }
        /*const formData = new FormData();
        formData.append('buildingName', buildingName)*/

    const handleSubmit = async(values: BuildingFormValues) => {
        try {
            const apiUrl = `${baseUrl}/buildings`;
            const response = await fetch(apiUrl, {
                method :"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if(response.ok){
                alert('OOOOOK')
                form.reset();
            }else{
                alert('Something when wrong ...')
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    return(
        <>



<form onSubmit={form.onSubmit(handleSubmit)}>
    <TextInput
      label="Nom du batiment"
    //   description="Un nom unique"
      placeholder="Merci d'ajouter le nom du batiment"
      {...form.getInputProps("name")}
    />
    <TextInput
      label="Adresse"
    //   description="Un nom unique"
      placeholder="Adresse complète"
      {...form.getInputProps("address")}
    />
    <TextInput
      label="Nom du responsable"
      description="Doit être remplacé par un dropdown"
      placeholder="Qui est le responsable ?"
      {...form.getInputProps("responsible")}
    />
<Group justify="center">
        <FileButton /*fullWidth*/ onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => <Button {...props}>Ajouter photo(s)</Button>}
        </FileButton>
      </Group>

      {files.length > 0 && (
        <Text size="sm" mt="sm">
          Picked files:
        </Text>
      )}

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>

    <Button fullWidth type="submit">Enregistrer</Button>
</form>
        </>
    )
}