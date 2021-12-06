import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./ngrokURL";
// const API_URL = "http://6104-49-124-200-218.ngrok.io/api";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: false,
    error: null,
    categoryID: "",
    pending: [],
    complete: [],
  },
  reducers: {
    getCategory: (state) => {
      state.isLoading = true;
    },
    categoryLogout: (state) => {
      state.pending = [];
      state.complete = [];
      state.token = "";
      state.isLoading = false;
    },
    getPendingCountSuccess: (state, action) => {
      state.isLoading = false;
      state.pending = action.payload;
    },
    getCompleteCountSuccess: (state, action) => {
      state.isLoading = false;
      state.complete = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getCategory,
  categoryLogout,
  getCompleteCountSuccess,
  getPendingCountSuccess,
} = categorySlice.actions;

// The reducer
export default categorySlice.reducer;

// Asynchronous thunk action
export const fetchPendingTaskCountGroupByCategory =
  (data) => async (dispatch) => {
    dispatch(getCategory());

    // console.log("fetch pending task count input..", data);
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(`${API_URL}/pendingTaskCountGroupByCategory/${data.user_id}?`, {
        token: data.token,
      })
      .then((res) => {
        // console.log("res..", res);
        if (res.status === 200) {
          // console.log("res data..", res.data);
          dispatch(getPendingCountSuccess(res.data.data));
        }
      })
      .catch(function (error) {
        console.log("error response", error.response);
        alert(
          `Error response (status: ${error.response.status}, message: ${error.response.statusText})`
        );
      });
  };
export const fetchCompleteTaskCountGroupByCategory =
  (data) => async (dispatch) => {
    // dispatch(getCategory());

    console.log("fetch complete task count input..", data);
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(`${API_URL}/completeTaskCountGroupByCategory/${data.user_id}?`, {
        token: data.token,
      })
      .then((res) => {
        // console.log("res..", res);
        if (res.status === 200) {
          // console.log("res data..", res.data);
          dispatch(getCompleteCountSuccess(res.data.data));
        }
      })
      .catch(function (error) {
        console.log("error response", error.response);
        alert(
          `Error response (status: ${error.response.status}, message: ${error.response.statusText})`
        );
      });
  };
