import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export default function ComingSoon() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="blue" radius="md" title="Coming Soon" icon={icon}>
      Cette page est actuellement en cours de développement. Revenez bientôt pour constater l'avancement.
    </Alert>

  );
}