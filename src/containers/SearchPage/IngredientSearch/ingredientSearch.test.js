const { checkEnteredIngredient } = require('./checkEnteredIngredient');
import list from './list.json';

test('check if ingredient is in list', () => {
  expect(checkEnteredIngredient('vodka', list.drinks)).toBe('Vodka');
});

test('check if ingredient is not in list', () => {
  expect(checkEnteredIngredient('william', list.drinks)).toBeFalsy();
});
