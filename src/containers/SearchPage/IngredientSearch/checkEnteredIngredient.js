const checkEnteredIngredient = (ingredient, list) => {
  const lowerCaseList = list.map((ingredient) => {
    return ingredient.toLowerCase();
  });
  const newIngredient = ingredient.toLowerCase().trim();
  return lowerCaseList.includes(newIngredient)
    ? newIngredient.charAt(0).toUpperCase() +
        newIngredient.substr(1).toLowerCase()
    : false;
};

export { checkEnteredIngredient };
