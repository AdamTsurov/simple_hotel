import { createSlice, createAction, createAsyncThunk, current } from '@reduxjs/toolkit';

const initialState = {
  hotels: [],
  sliderImages: [],
  loading: false,
  countDay: 1,
  selectDate: new Date().toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' }),
};

export const getHotels = createAsyncThunk(
  'hotels/get',
  async (
    {
      location = 'Moscow',
      currency = 'rub',
      checkIn = new Date().toLocaleDateString('en-ca'),
      checkOut = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-ca'),
      limit = '10',
    },
    thunkAPI,
  ) => {
    try {
      const res = await fetch(
        `http://engine.hotellook.com/api/v2/cache.json?lang=ru&location=${location}&currency=${currency}&checkIn=${checkIn}&checkOut=${checkOut}&limit=${limit}`,
      );
      if (!res.ok) {
        throw new Error('Отели по запросу не найдены!');
      }
      const receivedHotels = await res.json();
      return receivedHotels;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getSliderImages = createAsyncThunk('sliderImages/get', async (_, thunkAPI) => {
  try {
    const res = await fetch('https://64873c02beba629727904943.mockapi.io/imagesFromSlider');
    if (!res.ok) {
      throw new Error('Изображения по запросу не найдены!');
    }
    const receivedImages = await res.json();
    return receivedImages;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setCount(state, action) {
      state.countDay = action.payload;
    },
    setDate(state, action) {
      state.selectDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotels.fulfilled, (state, action) => {
        state.hotels = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getHotels.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getHotels.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getSliderImages.fulfilled, (state, action) => {
        state.sliderImages = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getSliderImages.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getSliderImages.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export const { setCount, setDate } = hotelSlice.actions;

export default hotelSlice.reducer;
