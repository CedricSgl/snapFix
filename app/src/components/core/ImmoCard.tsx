import { AppShell, Loader, Paper, Text, Image, Grid, GridCol, Title } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { getAllImmoProperties, getImmoPropertiesById } from "../../services/api";
import { ImmoId, ImmoProperty } from "../../types/immo";

export const AllImmoCard: FC = () => {
    const [properties, setProperties] = useState<ImmoProperty[]>([])
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getAllImmoProperties();
                setProperties(data);
            } catch (error) {
                console.error('Failed to fetch : ', error)
            }
        };
        fetchProperties();
    },[]);
    return (
        <AppShell.Main>
            <ul>
            {properties.map(property => (
                <li key={property._id}>{property._id} - {property.title}</li>
            ))
            }
            </ul>
        </AppShell.Main>
    )
}



export function ImmoCard({id} :ImmoId){
    const [property, setProperty] = useState<ImmoProperty | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true)
                const data = await getImmoPropertiesById(id);
                setProperty(data);
                setError(null)
            } catch (error) {
                console.error('Failed to fetch property : ', error)
                setError('Failed to load property data. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        fetchProperty()
    }, [id]);
    if(loading){
        return (
            <AppShell.Main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loader size="xl" />
            </AppShell.Main>
        );
    }
    if(error){
        return (
            <>    
                <Paper p="md" withBorder color="red">
                    <Text>{error}</Text>
                </Paper>
            </>
        );
    }

    if (!property) {
        return (
            <>
                <Text>No property data available.</Text>
                </>
        );
    }
    
    return(
        <>
            <Grid>
                <GridCol span={6}>
                    <Image
                        radius="md"
                        src="https://via.placeholder.com/500x200"
                        alt="Product"
                        height={200}
                        fit="initial"
                        />
                </GridCol>
                <GridCol span={6}>
                    <Text size="xl">{property.title}</Text>

                    {/* <Text size="xl">{property.title}</Text> */}
                    {/* <Text>ID: {property._id}</Text> */}
                    <Title>{property.price} €</Title>
                    {/* <Text>Price: {property.price} €</Text> */}
                    <Text>{property.description}</Text>
                </GridCol>
            </Grid>
        </>
        )
}