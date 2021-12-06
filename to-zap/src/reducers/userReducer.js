import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./ngrokURL";
import { categoryLogout } from "./categoryReducer";
import { taskLogout } from "./taskReducer";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    token: "",
    isLoading: false,
    error: null,
    isLogout: false,
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
    },
    getUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLogout = true;
    },
    addUserSuccess: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    addUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    getUserLogout: (state) => {
      state.isLogout = true;
    },
    userLogout: (state, action) => {
      state.items = [];
      state.token = "";
      state.isLoading = false;
      state.isLogout = false;
    },
  },
});

// Three actions generated from the slice
export const {
  getUser,
  getUserLogout,
  getUserSuccess,
  getUserFail,
  addUserSuccess,
  userLogout,
} = userSlice.actions;

// The reducer
export default userSlice.reducer;

// Asynchronous thunk action
export const fetchUser = (input) => async (dispatch) => {
  dispatch(getUser());
  console.log("fetch input..", input);
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
        dispatch(getUserSuccess(res.data));
      }
    })
    .catch(function (error) {
      // console.log(error.config);
      // console.log("error response", error.response);
      // console.log("error response data", error.response.data);
      dispatch(getUserFail());
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data.error})`
      );
    });
};
export const fetchRegisterUser = (input) => async (dispatch) => {
  dispatch(getUser());
  console.log("register input..", input);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/register`, {
      email: input.email,
      password: input.password,
      name: input.full_name,
    })
    .then((res) => {
      // console.log("reg res..", res);
      if (res.status === 201) {
        // console.log("reg res data..", res.data);
        dispatch(addUserSuccess(res.data));
      }
    })
    .catch(function (error) {
      // console.log(error.config);
      // console.log("error response", error.response);
      // console.log("error response data", error.response.data);
      dispatch(getUserFail(error.response.data));
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data})`
      );
    });
};
export const fetchLogout = (token) => async (dispatch) => {
  dispatch(getUserLogout());
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
        // dispatch(categoryLogout());
        // dispatch(taskLogout());
      }
    })
    .catch(function (error) {
      // console.log(error.config);
      // console.log("error response", error.response);
      // console.log("error response data", error.response.data);
      dispatch(getUserFail(error.response.data));
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data})`
      );
    });
};
