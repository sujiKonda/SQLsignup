import { configureStore, createSlice } from '@reduxjs/toolkit';

let state = {
    userData : {}
}


const userSlice = createSlice({
    name: 'userStore',
    initialState: state,
    reducers: {
      userPayload: ( state, payload={} ) => {
        state.userData = payload.payload;
      }
    }
  });

  const store = configureStore({
    reducer: {
        userStore: userSlice.reducer
    }
  });

  export const { userPayload } = userSlice.actions;

  export default store;
