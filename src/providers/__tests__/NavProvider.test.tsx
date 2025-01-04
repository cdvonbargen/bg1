import { use } from 'react';

import Screen from '@/components/Screen';
import NavContext, { NavError } from '@/contexts/NavContext';
import NavProvider from '@/providers/NavProvider';
import { click as _click, render, see, waitFor } from '@/testing';

function Screen1() {
  const { goTo } = use(NavContext);
  return (
    <Screen title="Screen 1">
      <button onClick={() => goTo(<Screen2 sub={1} />)}>Screen 2.1</button>
    </Screen>
  );
}

function Screen2({ sub }: { sub: number }) {
  const { goTo } = use(NavContext);
  return (
    <Screen title={`Screen 2.${sub}`}>
      <button onClick={() => goTo(<Screen3 />)}>Screen 3</button>
    </Screen>
  );
}

function Screen3() {
  const { goTo, goBack } = use(NavContext);
  return (
    <Screen title="Screen 3">
      <button
        onClick={() => {
          try {
            goBack({ screen: Screen4 });
          } catch (error) {
            if (error instanceof NavError) goBack({ screen: Screen1 });
          }
        }}
      >
        Screen 1
      </button>
      <button onClick={() => goBack()}>Screen 2.1</button>
      <button onClick={() => goTo(<Screen4 />, { replace: true })}>
        Screen 4
      </button>
    </Screen>
  );
}

function Screen4() {
  const { goBack } = use(NavContext);
  return (
    <Screen title="Screen 4">
      <button onClick={() => goBack({ screen: Screen2, props: { sub: 2 } })}>
        Screen 2.2
      </button>
    </Screen>
  );
}

function renderComponent() {
  render(
    <NavProvider>
      <Screen1 />
    </NavProvider>
  );
}

async function click(screenNum: number, sub?: number) {
  const title = `Screen ${screenNum}.${sub ?? ''}`.replace(/\.$/, '');
  _click(title);
  await see.screen(title);
  if (screenNum > 1) see('Go Back');
}

describe('NavProvider', () => {
  it('renders nav', async () => {
    renderComponent();
    await see.screen('Screen 1');
    await click(2, 1);
    await click(3);
    await click(2, 1);
    await click(3);
    await click(4);
    await click(2, 2);
    await click(3);
    await click(1);

    location.hash = '#999';
    await waitFor(() => expect(location.hash).toBe('#0'));

    const beforeUnload = new Event('beforeunload');
    beforeUnload.preventDefault = jest.fn();
    dispatchEvent(beforeUnload);
    expect(beforeUnload.preventDefault).toHaveBeenCalled();
  });
});
