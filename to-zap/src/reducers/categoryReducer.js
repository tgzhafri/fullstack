import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./ngrokURL";
// const API_URL = "http://6104-49-124-200-218.ngrok.io/api";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
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
    categoryLogout: (state, action) => {
      state.items = [];
      state.pending = [];
      state.complete = [];
      state.token = "";
      state.isLoading = false;
    },
    getCategoryId: (state, action) => {
      state.isLoading = false;
      state.categoryID = action.payload;
    },
    getPendingCountSuccess: (state, action) => {
      state.isLoading = false;
      state.pending = action.payload;
    },
    getCompleteCountSuccess: (state, action) => {
      state.isLoading = false;
      state.complete = action.payload;
    },
    getCategorySuccess: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    getCategoryFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    createCategoryFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    editCategoryFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getCategory,
  categoryLogout,
  getCategorySuccess,
  getCategoryFail,
  createCategorySuccess,
  createCategoryFail,
  editCategorySuccess,
  editCategoryFail,
  getCategoryId,
  getCompleteCountSuccess,
  getPendingCountSuccess,
} = categorySlice.actions;

// The reducer
export default categorySlice.reducer;

// Asynchronous thunk action
export const fetchCategory = (data) => async (dispatch) => {
  dispatch(getCategory());

  // console.log("category fetch input..", data);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/getCategory/${data.user_id}`, {
      token: data.token,
    })
    .then((res) => {
      // console.log("res..", res);
      if (res.status === 200) {
        // console.log("res data..", res.data);
        dispatch(getCategorySuccess(res.data));
      }
    })
    .catch(function (error) {
      console.log("error", error);
      console.log("error response", error.response);
      // alert(
      //   `Error response (status: ${error.response.status}, message: ${error.response.statusText})`
      // );
      dispatch(getCategoryFail());
    });
};
export const fetchCreateCategory = (data) => async (dispatch) => {
  dispatch(getCategory());
  // console.log("category create input..", data);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/createCategory/`, {
      user_id: data.user_id,
      token: data.token,
      list: data.name,
      status: data.status,
    })
    .then((res) => {
      // console.log("reg res..", res);
      if (res.status === 201) {
        // console.log("reg res data..", res.data);
        const input = {
          user_id: data.user_id,
          token: data.token,
        };
        dispatch(fetchCategory(input));
      }
    })
    .catch(function (error) {
      console.log("error response", error.response);
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data})`
      );
      dispatch(createCategoryFail());
    });
};
export const fetchEditCategory = (data) => async (dispatch) => {
  dispatch(getCategory());
  // console.log("category edit input??", data);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/updateCategory/${data.id}`, {
      token: data.token,
      list: data.name,
      status: data.status,
    })
    .then((res) => {
      // console.log("res..", res);
      if (res.status === 201) {
        // console.log("res data..", res.data);
        const input = {
          user_id: data.user_id,
          token: data.token,
        };
        dispatch(fetchCategory(input));
      }
    })
    .catch(function (error) {
      console.log("error response", error.response);
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data})`
      );
      dispatch(editCategoryFail());
    });
};
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
          `Error response (status: ${error.response.status}, message: ${error.response.data})`
        );
        dispatch(getCategoryFail());
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
        if (error.response) {
          console.log("error response", error.response);
          alert(
            `Error response (status: ${error.response.status}, message: ${error.response.data})`
          );
        }
        console.log("error??", error);
        dispatch(getCategoryFail());
      });
  };
