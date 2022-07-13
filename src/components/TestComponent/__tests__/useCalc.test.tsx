import { useCalc } from '@/components/TestComponent/useCalc';

import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

export const renderUseCounter = () => renderHook<undefined, ReturnType<typeof useCalc>>(() => useCalc());
let consoleErrorMock: jest.MockInstance<unknown, any[]>;
beforeAll(() => {
  consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  consoleErrorMock.mockRestore();
});

describe('useCalc unit test', () => {
  it('sum method should work properly', () => {
    const mockResult = 6;
    const { result } = renderUseCounter();

    act(() => result.current.sum(1, 2, 3));
    expect(result.current.result).toBe(mockResult);
  });

  it('sub method should work properly', () => {
    const mockResult = 1;
    const { result } = renderUseCounter();

    act(() => result.current.sub(5, 2, 2));
    expect(result.current.result).toBe(mockResult);
  });

  it('mul method should work properly', () => {
    const mockResult = 20;
    const { result } = renderUseCounter();

    act(() => result.current.mul(5, 2, 2));
    expect(result.current.result).toBe(mockResult);
  });

  it('div method should work properly', () => {
    const mockResult = 1.25;
    const { result } = renderUseCounter();

    act(() => result.current.div(5, 2, 2));
    expect(result.current.result).toBe(mockResult);
  });

  it('should log error if some division operand === 0', () => {
    const { result } = renderUseCounter();
    act(() => result.current.div(5, 0, 2));
    expect(result.current.result).toBe(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(1);
  });
});
