import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authorization } from '../../loginLogic/authorizationСheck/authorizationСheck';
import { updateUserToken } from '../../updateUserDataLogic/updateUserDataLogic';
import { validationRegistration } from '../../loginLogic/validations/validationRegistration';

const initialState = {
  token: localStorage.getItem('token'),
  authorizated: localStorage.getItem('authorizated'),
  favoriteHotels: [],
  error: false,
};

export const signUp = createAsyncThunk('auth/signUp', async ({ email, password }, thunkAPI) => {
  try {
    if (validationRegistration({ email, password })) {
      const res = await fetch('http://localhost:3001/registration/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          favoriteHotels: [],
          token: '',
        }),
      });
      const userData = await res.json();
      if (userData.error) {
        return thunkAPI.rejectWithValue(userData.error);
      }
      return userData;
    } else {
      return thunkAPI.rejectWithValue(
        `Проверьте пароль, он должен содержать одну заглавную букву, 
        строчную, символ и должен быть не менее 8 символов. 
        А также почту на правильность, пример: example@gmail.com`,
      );
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }, thunkAPI) => {
  try {
    // Авторизация и получение токена, избраных отелей
    const userAuthorizatedTokenAndHotels = await authorization(email, password);
    if (userAuthorizatedTokenAndHotels instanceof Error) {
      return thunkAPI.rejectWithValue(userAuthorizatedTokenAndHotels.message);
    }
    // Запись токена в данные пользователя
    const updatedUserTokenData = await updateUserToken(email, userAuthorizatedTokenAndHotels.token);

    if (updatedUserTokenData instanceof Error) {
      return thunkAPI.rejectWithValue(updatedUserTokenData.message);
    }
    localStorage.setItem('token', userAuthorizatedTokenAndHotels.token);
    localStorage.setItem('authorizated', true);
    return userAuthorizatedTokenAndHotels.favoriteHotels;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signOut = createAsyncThunk('auth/singOut', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('Вы не авторизованы!');
    }
    const resToken = await fetch(`http://localhost:3001/users/${token}/delete`, {
      method: 'PATCH',
    });
    if (resToken.error) {
      return thunkAPI.rejectWithValue(resToken.error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('authorizated');
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getFavoriteHotels = createAsyncThunk('favoriteHotel/get', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:3001/user/${token}`);
  const email = await res.json();
  if (email.error) {
    return thunkAPI.rejectWithValue(email.error);
  }
  const hotelsRes = await fetch(`http://localhost:3001/favorite/hotel/user/${email}`);
  const recievedFavoriteHotels = await hotelsRes.json();
  if (recievedFavoriteHotels.error) {
    return thunkAPI.rejectWithValue(recievedFavoriteHotels.error);
  }
  return recievedFavoriteHotels.favoriteHotels;
});

export const addHotelForUser = createAsyncThunk(
  'favoriteHotel/add',
  async ({ hotelId, hotelName, price, starsHotel }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/user/${token}`);
      const email = await res.json();
      if (email.error) {
        return thunkAPI.rejectWithValue(email.error);
      }
      const hotelsRes = await fetch(`http://localhost:3001/favorite/hotel/user/${email}/add`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId,
          hotelName,
          price,
          starsHotel,
        }),
      });
      const updatedFavoriteHotels = await hotelsRes.json();
      if (updatedFavoriteHotels.error) {
        return thunkAPI.rejectWithValue(updatedFavoriteHotels.error);
      }
      return updatedFavoriteHotels.favoriteHotels;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const removeHotelForUser = createAsyncThunk(
  'favoriteHotel/remove',
  async ({ hotelId }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/user/${token}`);
      const email = await res.json();
      if (email.error) {
        return thunkAPI.rejectWithValue(email.error);
      }
      const hotelsRes = await fetch(`http://localhost:3001/favorite/hotel/user/${email}/remove`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId,
        }),
      });
      const updatedFavoriteHotels = await hotelsRes.json();
      if (updatedFavoriteHotels.error) {
        return thunkAPI.rejectWithValue(updatedFavoriteHotels.error);
      }
      return updatedFavoriteHotels.favoriteHotels;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(signUp.pending, (state, action) => {
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.favoriteHotels = action.payload;
        state.authorizated = true;
        state.error = null;
      })
      .addCase(signIn.pending, (state, action) => {
        state.error = null;
        state.authorizated = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.authorizated = false;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.authorizated = false;
        state.token = '';
        state.error = null;
      })
      .addCase(signOut.pending, (state, action) => {
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload;
        state.authorizated = false;
      })
      .addCase(getFavoriteHotels.fulfilled, (state, action) => {
        state.favoriteHotels = action.payload;
        state.error = null;
      })
      .addCase(getFavoriteHotels.pending, (state, action) => {
        state.error = null;
      })
      .addCase(getFavoriteHotels.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addHotelForUser.fulfilled, (state, action) => {
        state.favoriteHotels = action.payload;
        state.error = null;
      })
      .addCase(addHotelForUser.pending, (state, action) => {
        state.error = null;
      })
      .addCase(addHotelForUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeHotelForUser.fulfilled, (state, action) => {
        state.favoriteHotels = action.payload;
        state.error = null;
      })
      .addCase(removeHotelForUser.pending, (state, action) => {
        state.error = null;
      })
      .addCase(removeHotelForUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
