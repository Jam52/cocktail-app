const fakeData = { drinks: [{
    strDrink: "'57 Chevy with a White License Plate",
    strDrinkThumb:
      'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
    idDrink: '14029',
  }]}

export default async (searchTerm) => {
    const response = await new Promise((resolve) => {
        resolve(fakeData)
    })
    return await response.drinks
}