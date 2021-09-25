import { formatPrice } from 'util/formatters';

describe('format price for positive numbers', () => {
  test('formatPrice should format number en-us when given 10.1', () => {
    const result = formatPrice(10.1);
    expect(result).toEqual('10.10');
  });

  test('formatPrice should format number en-us when given 0.1', () => {
    const result = formatPrice(0.1);
    expect(result).toEqual('0.10');
  });
});

describe('format price for non positive numbers', () => {
  test('formatPrice should format number en-us when given -10.1', () => {
    const result = formatPrice(10.1);
    expect(result).toEqual('10.10');
  });

  test('formatPrice should format number en-us when given -0.1', () => {
    const result = formatPrice(0.1);
    expect(result).toEqual('0.10');
  });

  test('formatPrice should format number en-us when given 0', () => {
    const result = formatPrice(0);
    expect(result).toEqual('0.00');
  });
});
