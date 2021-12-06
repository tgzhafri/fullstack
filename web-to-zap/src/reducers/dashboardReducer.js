import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./ngrokURL";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    items: [],
    pending: [],
    complete: [],
    token: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    getDashboard: (state) => {
      state.isLoading = true;
    },
    getDashboardSuccess: (state, action) => {
      state.items = action.payload.data.dashboard;
      state.token = action.payload.data.access_token;
      state.isLoading = false;
      state.error = false;
    },
    getTaskCount: (state) => {
      state.isLoading = true;
    },
    getPendingTaskCountSuccess: (state, action) => {
      state.pending = action.payload.data;
      state.token = action.payload.data.access_token;
      state.isLoading = false;
      state.error = false;
    },
    getCompleteTaskCountSuccess: (state, action) => {
      state.complete = action.payload.data;
      state.token = action.payload.data.access_token;
      state.isLoading = false;
      state.error = false;
    },
    getDashboardFail: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

// Three actions generated from the slice
export const {
  getDashboard,
  getDashboardSuccess,
  getDashboardFail,
  getTaskCount,
  getPendingTaskCountSuccess,
  getCompleteTaskCountSuccess,
} = dashboardSlice.actions;

// The reducer
export default dashboardSlice.reducer;

// Asynchronous thunk action
export const fetchDashboard = (input) => async (dispatch) => {
  dispatch(getDashboard());
  // console.log("fetching dashboard..", input);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/dashboard/${input.user_id}`, {
      token: input.token,
    })
    .then((res) => {
      //   console.log("dash res..", res);
      if (res.status === 200) {
        // console.log("dash res data..", res.data);
        console.log("fetch dashboard success!", res.data);
        dispatch(getDashboardSuccess(res.data));
      }
    })
    .catch(function (error) {
      console.log(error.response);
      console.log(error.config);
    });
};
export const pendingTaskCountGroupByDate = (input) => async (dispatch) => {
  dispatch(getTaskCount());
  // console.log("fetching task count..", input);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/pendingTaskCountGroupByDate/${input.user_id}`, {
      token: input.token,
    })
    .then((res) => {
      // console.log("task count res..", res);
      if (res.status === 200) {
        console.log("fetch pending task count success!", res.data);
        dispatch(getPendingTaskCountSuccess(res.data));
      }
    })
    .catch(function (error) {
      console.log(error.response);
      console.log(error.config);
    });
};
export const completeTaskCountGroupByDate = (input) => async (dispatch) => {
  dispatch(getTaskCount());
  // console.log("fetching task count..", input);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/completeTaskCountGroupByDate/${input.user_id}`, {
      token: input.token,
    })
    .then((res) => {
      // console.log("task count res..", res);
      if (res.status === 200) {
        console.log("fetch complete task count success!", res.data);
        dispatch(getCompleteTaskCountSuccess(res.data));
      }
    })
    .catch(function (error) {
      console.log(error.response);
      console.log(error.config);
    });
};
