import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { UserInfo } from '@/components/TestComponent/UserInfo';

import { Queries } from '@testing-library/dom';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const render = (
  ui: JSX.Element,
  renderOptions: Omit<RenderOptions<Queries, Element | DocumentFragment>, 'wrapper'> = {}
) => {
  const Wrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

const inputValues = {
  name: 'Billy Milligan',
  age: '39',
  favouriteFood: 'pork brains',
};

describe('UserInfo', () => {
  it('Form should submit and set values to redux store', async () => {
    const { getByLabelText, getByRole } = render(<UserInfo />);

    const nameInput = getByLabelText(/name/i);
    const foodInput = getByLabelText(/favourite food/i);
    const ageInput = getByLabelText(/age/i);

    expect(nameInput).toBeInTheDocument();
    expect(foodInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();

    await userEvent.type(nameInput as Element, inputValues.name);
    await userEvent.type(foodInput as Element, inputValues.favouriteFood);
    await userEvent.type(ageInput as Element, inputValues.age);

    expect(getByLabelText(/name/i)).toHaveValue(inputValues.name);
    expect(getByLabelText(/age/i)).toHaveValue(Number(inputValues.age));
    expect(getByLabelText(/favourite food/i)).toHaveValue(inputValues.favouriteFood);

    await userEvent.click(
      getByRole('button', {
        name: /submit/i,
      }) as Element
    );

    expect(store.getState().userInfo).toStrictEqual(inputValues);
  });
});
