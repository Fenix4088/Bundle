import { Counter } from '../Counter';

import { render as renderRtl } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const renderCounter = () => {
  const render = renderRtl(<Counter />);

  return {
    render,
    display: render.getByLabelText(/display/i),
    warning: render.getByLabelText(/warning-message/i),
    incBtn: render.getByRole('button', {
      name: /inc/i,
    }),
    decBtn: render.getByRole('button', {
      name: /dec/i,
    }),
  };
};

describe('TestComponent unit', () => {
  it('should render properly', () => {
    const {
      display,
      warning,
      decBtn,
      incBtn,
      render: { container },
    } = renderCounter();

    expect(display).toBeInTheDocument();
    expect(display).toHaveTextContent('0');
    expect(warning).toBeInTheDocument();
    expect(warning).toHaveTextContent('0 is a min value');
    expect(incBtn).toBeInTheDocument();
    expect(decBtn).toBeInTheDocument();

    expect(container).toMatchSnapshot(``);
  });

  it('should increase counter', async () => {
    const {
      incBtn,
      decBtn,
      warning,
      display,
      render: { queryByLabelText, getByLabelText },
    } = renderCounter();

    expect(decBtn).toBeDisabled();
    expect(warning).toBeInTheDocument();
    expect(warning).toHaveTextContent('0 is a min value');
    expect(display).toHaveTextContent('0');

    await userEvent.click(incBtn);

    expect(display).toHaveTextContent('1');
    expect(queryByLabelText(/warning-message/i)).not.toBeInTheDocument();

    await userEvent.click(incBtn);
    await userEvent.click(incBtn);
    expect(display).toHaveTextContent('3');
    expect(getByLabelText(/warning-message/i)).toHaveTextContent('3 is a max value');
    expect(incBtn).toBeDisabled();
  });
});
