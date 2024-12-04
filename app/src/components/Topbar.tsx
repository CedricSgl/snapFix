import { Anchor, Button, Group, Image } from "@mantine/core";
import logo from "../assets/react.svg"

export function Topbar() {

  return (
    <Group justify="space-between" align="center" style={{margin: "0px 10px", height: "100%"}}>
      <Image src={logo} style={{ flex: "0 0 55px", padding: "10px" }} />
      <Group
        mih={50}
        gap="xs"
        justify="flex-end"
        align="center"
        wrap="wrap"
      >
        <Anchor href="https://mantine.dev/" target="_blank">
          Product
        </Anchor>
        <Button variant="filled" color="gray" size="xs" radius="md">Sign In</Button>
        <Button variant="filled" color="rgba(0, 0, 0, 1)" size="xs" radius="md">Sign Out</Button>
      </Group>
    </Group>
  );
}
