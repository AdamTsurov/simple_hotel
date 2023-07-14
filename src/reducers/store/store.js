import { configureStore } from '@reduxjs/toolkit';
import authorization from '../slice/userSlice';
import hotels from '../slice/hotelSlice'

export default configureStore({
  reducer: {
    authorizationReducer: authorization,
    hotelsReducer: hotels
  },
});
