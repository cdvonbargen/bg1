import FloatingButton from '../FloatingButton';
import Screen from '../Screen';

const theme = { bg: 'bg-red-600', text: 'text-red-600' };

export default function Disclaimer({ onAccept }: { onAccept: () => void }) {
  return (
    <Screen title="Warning!" theme={theme}>
      <p>
        Use at your own risk. BG1 is highly experimental, for demonstration
        purposes only, and provided &quot;as is&quot; without warranty of any
        kind. It is in no way endorsed by or associated with the Walt Disney
        Company and could stop working at any time for any reason. To ensure the
        intended experience, always use the official Disney app.
      </p>
      <FloatingButton onClick={onAccept}>Accept</FloatingButton>
    </Screen>
  );
}
