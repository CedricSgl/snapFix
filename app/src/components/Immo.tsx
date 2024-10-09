import { Card, Grid, Image } from "@mantine/core";
import { Description } from "./Description";

export function Immo() {
    return (
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
    )
}