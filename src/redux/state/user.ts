import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserContentType {
  email: string;
  password: string;
}

export interface UserType {
  usersInfo: UserContentType[];
}

const initialState: UserType = {
  usersInfo: [{ email: 'admin', password: 'admin' }],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsersInfo: (state, action: PayloadAction<UserContentType>) => {
      state.usersInfo = [...state.usersInfo, action.payload];
    },
  },
});

export const { setUsersInfo } = userSlice.actions;

export const usersContent = (state: RootState) => state.user.usersInfo;

export default userSlice.reducer;
