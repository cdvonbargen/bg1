import { render, screen, setTime } from '@/testing';

import TimeBanner from '../TimeBanner';

describe('TimeBanner', () => {
  it('shows times', async () => {
    setTime('06:59');
    render(<TimeBanner bookTime="07:00:00" dropTime="11:30:00" />);
    expect(screen.getByText('Book:')).toHaveTextContent('Book: 7:00 AM');
    expect(screen.getByText('Drop:')).toHaveTextContent('Drop: 11:30 AM');
  });

  it('shows "now" if time is not in the future', () => {
    setTime('10:30');
    render(<TimeBanner bookTime="10:15:00" dropTime="10:30:00" />);
    expect(screen.getByText('Book:')).toHaveTextContent('Book: now');
    expect(screen.getByText('Drop:')).toHaveTextContent('Drop: now');
  });

  it('shows nothing if no times', async () => {
    const { container } = render(<TimeBanner />);
    expect(container).toBeEmptyDOMElement();
  });
});
