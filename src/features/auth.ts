// import { getCurrentUser } from "@/api/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStatetype = {
  userData: null | Object;
  loading: boolean;
  loggedIn: boolean;
};
function getCurrentUser () {
  
}
const getCurrentUserData = createAsyncThunk("userAuth", async () => {
  const response = await getCurrentUser();
  return response?.data;
});

const initialState: initialStatetype = {
  userData: null,
  loading: true,
  loggedIn: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.loggedIn = true;
    });
    builder.addCase(getCurrentUserData.pending, (state) => {
      state.userData = null;
      state.loading = true;
      state.loggedIn = false;
    });
    builder.addCase(getCurrentUserData.rejected, (state) => {
      state.userData = null;
      state.loading = false;
      state.loggedIn = false;
    });
  },
});

export { getCurrentUserData };
export default usersSlice.reducer;
