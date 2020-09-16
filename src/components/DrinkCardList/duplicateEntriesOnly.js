function duplicateEntriesOnly(data) {
  return data
    .sort((a, b) => (a.strDrink > b.strDrink ? 1 : -1))
    .filter((drink, index) => {
      if (data[index + 1] !== undefined) {
        return drink.strDrink === data[index + 1].strDrink;
      }
    });
}

export { duplicateEntriesOnly };
