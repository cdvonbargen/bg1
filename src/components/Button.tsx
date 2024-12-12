import { NavError, useNav } from '@/contexts/Nav';
import { useTheme } from '@/contexts/Theme';

const TYPES = {
  normal: 'py-1',
  small: 'py-1.5 text-xs uppercase tracking-wide',
  full: 'w-full py-3',
};

export default function Button<P>(
  props: Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'onClick'> & {
    onClick?: () => void | Promise<void>;
    type?: keyof typeof TYPES;
    back?: boolean | { screen?: React.FC<P>; props?: Partial<P> };
  }
) {
  const { goBack } = useNav();
  const { type, back, onClick, className, ...attrs } = props;
  let cls = `${TYPES[type || 'normal']} ${className || ''}`;
  const { bg } = useTheme();
  if (!cls.includes(' bg-')) cls += ` ${bg} text-white`;
  return (
    <button
      onClick={async event => {
        event.stopPropagation();
        if (onClick) await onClick();
        if (back) {
          try {
            if (back === true) {
              await goBack();
            } else {
              await goBack(back);
            }
          } catch (error) {
            if (!(error instanceof NavError)) throw error;
          }
        }
      }}
      className={`${cls} inline-flex items-center justify-center min-w-[36px] rounded-lg px-2 font-semibold disabled:opacity-50`}
      {...attrs}
    />
  );
}
