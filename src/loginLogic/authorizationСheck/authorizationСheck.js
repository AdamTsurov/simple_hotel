import { isEmailValid } from '../validations/validationRegistration';

export const authorization = async (email, password) => {
  console.log(email);
  if (isEmailValid(email)) {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const userData = await res.json();
    if (userData.error) {
      return new Error(userData.error);
    }
    if (!generateAuthToken()) {
      return new Error('Токен не сгенерирован!');
    }
    return {
      token: generateAuthToken(),
      favoriteHotels: userData.favoriteHotels,
    };
  } else {
    return new Error('Заполните email правильно! Пример: example@gmai.com');
  }
};

const generateAuthToken = () => {
  const tokenLength = 10;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
};
