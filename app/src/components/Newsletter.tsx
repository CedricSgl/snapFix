import { Box, Button, Grid, Text, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { baseUrl } from "../config";
import { notifications } from "@mantine/notifications";

export function Newsletter() {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email:''
    },
    validate: {
      email: (value: string) => (isEmail(value) ? null : "Invalid email"),
    },
  });
  
  interface FormValues {
    email: string;
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      // Replace with your actual API endpoint URL
      const apiUrl = `${baseUrl}/newsletterForm`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Request successful, do something here
        notifications.show({
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
          position: "top-center",
          autoClose: 5000,
          withCloseButton: false
        })
        form.reset();
      } else {
        // Request failed, handle errors here
        console.error("Error sending email.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Box mt="xl" mb="xl">
      <Text size="lg" ta="center">
        Follow the latest trends
      </Text>
      <Text size="sm" ta="center" color="dimmed" mb="md">
        With our daily newsletter
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid justify="center">
          <Grid.Col span={6}>
            <TextInput
              {...form.getInputProps("email")}
              placeholder="you@example.com"
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Button fullWidth color="black" type="submit">
              Submit
            </Button>
          </Grid.Col>
        </Grid>
      </form>
      <Button
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
          position: "top-center",
          autoClose: 5000,
          withCloseButton: false
        })
      }
    >
      Show notification
    </Button>
    </Box>
  );
}
