import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./ngrokURL";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    items: {},
    token: "",
    isLoading: false,
    error: null,
    auth: "",
  },
  reducers: {
    getUser: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.items = action.payload.data.user;
      state.token = action.payload.data.access_token;
      state.isLoading = false;
      state.error = false;
      state.auth = true;
    },
    getUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    userLogout: (state, action) => {
      state.items = [];
      state.token = "";
      state.auth = false;
      state.isLoading = false;
    },
  },
});

// Three actions generated from the slice
export const { getUser, getUserSuccess, getUserFail, userLogout } =
  userSlice.actions;

// The reducer
export default userSlice.reducer;

// Asynchronous thunk action
export const fetchUser = (input) => async (dispatch) => {
  dispatch(getUser());
  console.log("fetch login..", input);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/login`, {
      email: input.email,
      password: input.password,
    })
    .then((res) => {
      // console.log("res..", res);
      if (res.status === 200) {
        // console.log("res data..", res.data);
        console.log("fetch login success!");
        dispatch(getUserSuccess(res.data));
      }
    })
    .catch(function (error) {
      console.log(error.response);
      console.log(error.config);
      dispatch(getUserFail());
    });
};

export const fetchLogout = (token) => async (dispatch) => {
  // dispatch(getUser());
  console.log("token..", token);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/logout`, {
      token: token,
    })
    .then((res) => {
      console.log("res..", res);
      if (res.status === 200) {
        console.log("res data..", res.data);
        dispatch(userLogout());
      }
    })
    .catch(function (error) {
      console.log(error.response);
      console.log(error.config);
      dispatch(getUserFail());
    });
};
