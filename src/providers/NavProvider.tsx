import { useEffect, useRef, useState } from 'react';

import NavContext, { NavError } from '@/contexts/NavContext';
import ScreensContext, { Screens } from '@/contexts/ScreensContext';

let keyInc = 0;
const nextKey = () => ++keyInc;

const getHashPos = () => Number(location.hash.slice(1)) || 0;

let hashChanged = () => undefined as void;

export default function NavProvider({
  children,
}: {
  children: React.JSX.Element;
}) {
  const [screens, setScreens] = useState<Screens>({ activeScreen: children });
  const stack = useRef<{ elem: React.JSX.Element; key: number }[]>([
    { elem: children, key: 0 },
  ]);
  const nav = useRef({
    goTo(elem: React.JSX.Element, options?: { replace?: boolean }) {
      let pos = getHashPos();
      let key: number;
      if (options?.replace) {
        key = stack.current[pos].key ?? nextKey();
        setScreens(screens => ({ ...screens, activeScreen: elem }));
      } else {
        stack.current = stack.current.slice(0, ++pos);
        location.hash = `#${pos}`;
        key = nextKey();
      }
      stack.current[pos] = { elem, key };
    },
    goBack<P, C extends React.FC<P>>({
      screen: Screen,
      props,
    }: { screen?: C; props?: Partial<P> } = {}) {
      const promise = new Promise<void>(resolve => {
        hashChanged = () => {
          resolve();
          hashChanged = () => undefined;
        };
      });
      if (!Screen) {
        history.back();
        return promise;
      }
      const pos = getHashPos();
      for (let i = pos - 1; i >= 0; --i) {
        if (stack.current[i].elem.type === Screen) {
          history.go(i - pos);
          if (props) {
            const newProps = { ...stack.current[i].elem.props, ...props };
            stack.current[i].elem = <Screen {...newProps} />;
          }
          return promise;
        }
      }
      throw new NavError(`No previous ${Screen.name} screen`);
    },
  });

  useEffect(() => {
    function onHashChange() {
      hashChanged();
      const pos = getHashPos();
      if (pos >= stack.current.length) {
        history.back();
      } else {
        setScreens({
          activeScreen: stack.current[pos]?.elem ?? <div />,
          prevScreen: stack.current[pos - 1]?.elem,
        });
      }
    }

    function onBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
    }

    location.replace('#0');
    addEventListener('hashchange', onHashChange);
    addEventListener('beforeunload', onBeforeUnload);
    return () => {
      removeEventListener('hashchange', onHashChange);
      removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  const pos = Math.min(getHashPos(), stack.current.length - 1);
  return (
    <NavContext value={nav.current}>
      <ScreensContext value={screens}>
        {stack.current.slice(0, pos + 1).map(({ elem, key }, idx) => {
          const hidden = idx !== pos;
          return (
            <article key={key} hidden={hidden}>
              {elem}
            </article>
          );
        })}
      </ScreensContext>
    </NavContext>
  );
}
