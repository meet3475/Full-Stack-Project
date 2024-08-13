import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosInstance"

const initialState = {
    isAuthentication: false,
    isLogeedOut: true,
    isLoading: false,
    user: null,
    error: null
}

export const register = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('users/register', data);
            console.log(response);

            if (response.status === 201) {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Registration error: " + error.response.data.message)
        }

    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('users/login', data);
            console.log(response);

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Login error: " + error.response.data.message)
        }

    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('users/logout', {_id});
            console.log(response);

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Logout error: " + error.response.data.message)
        }

    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.isAuthentication = false;
            state.isLogeedOut = true;
            state.isLoading = false;
            state.user = action.payload.data;
            state.error = null;
        });

        builder.addCase(register.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLogeedOut = true;
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuthentication = true;
            state.isLogeedOut = false;
            state.isLoading = false;
            state.user = action.payload.data;
            state.error = null;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLogeedOut = true;
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAuthentication = false;
            state.isLogeedOut = true;
            state.isLoading = false;
            state.error = null;
        });

        builder.addCase(logout.rejected, (state, action) => {
            state.isAuthentication = true;
            state.isLogeedOut = false;
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        });
    }
});


export default authSlice.reducer