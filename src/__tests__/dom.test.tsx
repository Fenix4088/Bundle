import { App } from '@/components/App';

import { render } from '@testing-library/react';

it('root element should be in a DOM', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId(/app/)).toHaveTextContent(/app/i);
});
