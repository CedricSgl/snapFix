import { Button, TextInput, Textarea, Container, Grid, Card, Group, Image, Badge, Title, Text, Box } from '@mantine/core';

function ProductDetailPage() {
  return (
    <Container>
      {/* Header */}
      <Group position="right" mt="md" mb="lg">
        <Button variant="outline">Products</Button>
        <Button variant="default">Sign in</Button>
        <Button variant="filled">Register</Button>
      </Group>

      {/* Product section */}
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
          <Box>
            <Title order={2}>Text Heading</Title>
            <Badge color="green" variant="light">
              Tag
            </Badge>
            <Text weight={700} size="xl" mt="md">
              $50
            </Text>
            <Text mt="xs">Text</Text>
          </Box>
        </Grid.Col>
      </Grid>

      {/* Contact form */}
      <Box mt="xl">
        <Title order={3}>Get in touch</Title>
        <TextInput
          label="Name"
          placeholder="Value"
          required
          mt="md"
        />
        <TextInput
          label="Surname"
          placeholder="Value"
          required
          mt="md"
        />
        <TextInput
          label="Email"
          placeholder="Value"
          required
          mt="md"
        />
        <Textarea
          label="Message"
          placeholder="Value"
          required
          mt="md"
        />
        <Button fullWidth mt="md">Submit</Button>
      </Box>

      {/* Newsletter */}
      <Box mt="xl" mb="xl" sx={{ textAlign: 'center' }}>
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
    </Container>
  );
}

export default ProductDetailPage;