import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./ngrokURL";
// const API_URL = "http://6104-49-124-200-218.ngrok.io/api";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getTask: (state) => {
      state.isLoading = true;
    },
    taskLogout: (state, action) => {
      state.items = [];
      state.token = "";
      state.isLoading = false;
    },
    getTaskSuccess: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    getTaskFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createTaskFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    editTaskFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getTask,
  taskLogout,
  getTaskSuccess,
  getTaskFail,
  createTaskSuccess,
  createTaskFail,
  editTaskSuccess,
  editTaskFail,
} = taskSlice.actions;

// The reducer
export default taskSlice.reducer;

// Asynchronous thunk action
export const fetchTask = (data) => async (dispatch) => {
  dispatch(getTask());

  console.log("fetch task input..", data);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/getTask/${data.category_id}`, {
      token: data.token,
    })
    .then((res) => {
      // console.log("res..", res);
      if (res.status === 200) {
        // console.log("res data..", res.data);
        dispatch(getTaskSuccess(res.data));
      }
    })
    .catch(function (error) {
      console.log("error response", error.response);
      console.log("error config", error.config);
      dispatch(getTaskFail());
    });
};
export const fetchPendingTask = (data) => async (dispatch) => {
  dispatch(getTask());
  console.log("fetch task pending input..", data);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/getPendingTask/${data.category_id}`, {
      token: data.token,
    })
    .then((res) => {
      // console.log("res..", res);
      if (res.status === 200) {
        // console.log("res data..", res.data);
        dispatch(getTaskSuccess(res.data));
      }
    })
    .catch(function (error) {
      console.log("error response", error.response);
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data})`
      );
      dispatch(getTaskFail());
    });
};
export const fetchCompleteTask = (data) => async (dispatch) => {
  dispatch(getTask());

  console.log("fetch task complete input..", data);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/getCompleteTask/${data.category_id}`, {
      token: data.token,
    })
    .then((res) => {
      // console.log("res..", res);
      if (res.status === 200) {
        // console.log("res data..", res.data);
        dispatch(getTaskSuccess(res.data));
      }
    })
    .catch(function (error) {
      console.log("error response", error.response);
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data})`
      );
      dispatch(getTaskFail());
    });
};
export const fetchCreateTask = (data) => async (dispatch) => {
  dispatch(getTask());
  console.log("task create input..", data);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/createTask/`, {
      user_id: data.user_id,
      token: data.token,
      name: data.name,
      status: data.status,
      category_id: data.category_id,
    })
    .then((res) => {
      // console.log("task res..", res);
      if (res.status === 201) {
        // console.log("task res data..", res.data);
        const input = {
          category_id: data.category_id,
          token: data.token,
        };
        console.log("API call input", input);
        dispatch(fetchTask(input));
      }
    })
    .catch(function (error) {
      console.log("error response", error.response);
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data})`
      );
      dispatch(getTaskFail());
    });
};
export const fetchEditTask = (data) => async (dispatch) => {
  dispatch(getTask());
  console.log("task edit input??", data);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios
    .post(`${API_URL}/updateTask/${data.task_id}`, {
      token: data.token,
      name: data.name,
      status: data.status,
    })
    .then((res) => {
      // console.log("edit task res..", res);
      if (res.status === 201) {
        // console.log("edit task res data..", res.data);
        const input = {
          category_id: data.category_id,
          token: data.token,
        };
        dispatch(fetchTask(input));
      }
    })
    .catch(function (error) {
      console.log(error.config);
      console.log("error response", error.response);
      alert(
        `Error response (status: ${error.response.status}, message: ${error.response.data})`
      );
      dispatch(getTaskFail());
    });
};
