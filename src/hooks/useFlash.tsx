import { useCallback, useEffect, useState } from 'react';

type FlashType = 'alert' | 'error';

const DEFAULT_DURATION_MS = 3000;
const COLORS = { alert: 'bg-yellow-200', error: 'bg-red-200' };

export default function useFlash(): [React.ReactNode, typeof flash] {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<FlashType>('alert');

  useEffect(() => {
    if (message === '') return;
    const timeoutId = self.setTimeout(() => {
      setMessage('');
    }, DEFAULT_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, [message]);

  const flash = useCallback((message: string, type?: FlashType) => {
    setMessage(message);
    setType(type || 'alert');
  }, []);
  const flashElem = message ? <Flash message={message} type={type} /> : null;
  return [flashElem, flash];
}

export function Flash({ message, type }: { message: string; type: FlashType }) {
  return message ? (
    <div
      role="alert"
      className={`fixed bottom-20 left-0 w-full p-2 font-semibold text-center ${COLORS[type]} text-gray-800`}
    >
      {message}
    </div>
  ) : null;
}
