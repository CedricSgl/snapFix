import { Badge, Box, MantineColor, Text, Title } from "@mantine/core";

type DescriptionType = {
    title: string,
    text: string,
    price: string,
    badges?: ReadonlyArray<BadgeType>
}

type BadgeType = {
    text: string,
    color: MantineColor
}

export function Description(props: DescriptionType) {

const { title, text, price, badges } = props;

  return (
    <Box>
      <Title order={2}>{title}</Title>
      {badges && badges.map(badge => {
        return (
            <Badge color={badge.color} variant="light">
                {badge.text}
            </Badge>
        )
      })}
      <Text size="xl" mt="md">
        ${price}
      </Text>
      <Text mt="xs">{text}</Text>
    </Box>
  );
}
