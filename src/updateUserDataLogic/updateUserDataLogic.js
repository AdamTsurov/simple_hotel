export const updateUserToken = async (email, dataTokenForUpdate) => {
  const updatedUserTokenData = await fetch(`http://localhost:3001/users/${email}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ token: dataTokenForUpdate }),
  });
  const token = await updatedUserTokenData.json();
  if (token.error) {
    return new Error(token.error);
  }
  return token;
};

export const updateFavoriteHotelForUser = (email, dataHotelForUpdate) => {};
