const { checkEnteredIngredient } = require('../checkEnteredIngredient');
import list from './list.json';

test('check if ingredient is in list', () => {
  expect(checkEnteredIngredient('vodka', list.drinks)).toBe('Vodka');
  expect(checkEnteredIngredient(' vodka', list.drinks)).toBe('Vodka');
  expect(checkEnteredIngredient('william', list.drinks)).toBeFalsy();
});
