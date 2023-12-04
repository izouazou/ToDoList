import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(`/api/tasks/`, { headers: { 'Content-Type': 'application/json' } });
  return response.data;
});

export const fetchTask = createAsyncThunk('tasks/fetchTask', async ({ id }) => {
  const response = await axios.get(`/api/tasks/${id}/`, { headers: { 'Content-Type': 'application/json' } });
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async ({ body }) => {
  const response = await axios.post(`/api/tasks/`, { body }, { headers: { 'Content-Type': 'application/json' } });
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, body }) => {
  const response = await axios.put(`/api/tasks/${id}/`, { body }, { headers: { 'Content-Type': 'application/json' } });
  return response.data;
});


export const completeTask = createAsyncThunk('tasks/completeTask', async ({ id }) => {
  const response = await axios.post(`/api/tasks/${id}/`, null, { headers: { 'Content-Type': 'application/json' } });
  return response.data;
});


export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`/api/tasks/${id}/`, { headers: { 'Content-Type': 'application/json' } });
  return id;
});




const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, body } = action.payload;
        const existingTask = state.tasks.find((task) => task.id === Number(id));
        if (existingTask) {
          existingTask.body = body;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;
        state.tasks = state.tasks.filter((task) => task.id !== Number(id));
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingTask = state.tasks.find((task) => task.id === Number(id));
        if (existingTask) {
          existingTask.completed = true;
        }
      });
      
  },
});

export default taskSlice.reducer;
