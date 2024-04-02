import { typeLogin, typeRegister } from '../utils/constant';
import http from '../utils/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Save from '../utils/constant';
import Image from '../utils/image.type';


export interface UserState {
    users: any,
    listSave: Save[],
    listCreate: Image[]

};
const initialState: UserState = {
    users: {},
    listSave: [],
    listCreate: []
};

export const logIn = createAsyncThunk('user/login', async (model: typeLogin, thunkAPI) => {
    try {
        const { data } = await http.post('/user/login', model, {
            signal: thunkAPI.signal
        })
        console.log(model)
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const signUp = createAsyncThunk('user/signup', async (model: typeRegister, thunkAPI) => {
    try {
        const { data } = await http.post('/user/register', model, {
            signal: thunkAPI.signal
        })
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const getUser = createAsyncThunk('user/getUser', async (token: any, thunkAPI) => {
    try {
        const { data } = await http.get(`/user`, token)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getListSave = createAsyncThunk('user/getList/Save', async (token: any, thunkAPI) => {
    try {
        const { data } = await http.get('/user/list-save', token)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getListCreate = createAsyncThunk('user/getList/Create', async (token: any, thunkAPI) => {
    try {
        const { data } = await http.get('/user/list-create', token)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const postSave = createAsyncThunk('user/save', async (model: { imageId: String, token: any }, thunkAPI) => {
    try {
        const { data } = await http.post(`/post/image/${model.imageId}/save`)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const editPass = createAsyncThunk('user/edit-pass', async (model: { newPassword: string, token: any }, thunkAPI) => {
    try {
        const { data } = await http.put('/user/changePassword', model, {
            signal: thunkAPI.signal
        })
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const editInfo = createAsyncThunk('user/edit-info', async (model: { userName: string, token: any }, thunkAPI) => {
    try {
        const { data } = await http.put('/user/changeInfo', model, {
            signal: thunkAPI.signal
        })
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const uploadImange = createAsyncThunk('user/upload-image', async (model: { image: File, description: string }, thunkAPI) => {
    try {
        console.log(model)
        const { data } = await http.post('/upload', model, {
            signal: thunkAPI.signal,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(logIn.fulfilled, (_, action) => {
                localStorage.setItem("LOGIN_USER", action.payload.data)
                window.location.href = '/'
                alert(`Thông báo: ${action.payload.message}`)
            })
            .addCase(logIn.rejected, (_, action) => {
                alert(`Thông báo: ${action.payload}`)
            })
            .addCase(signUp.fulfilled, (_, action) => {
                alert(`Thông báo: ${action.payload.message}`)
                window.location.href = '/login'
            })
            .addCase(signUp.rejected, (_, action) => {
                alert(`Thông báo: ${action.payload}`)
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.users = action.payload.data
            })
            .addCase(getListSave.fulfilled, (state, action) => {
                state.listSave = action.payload.data
            })
            .addCase(getListCreate.fulfilled, (state, action) => {
                state.listCreate = action.payload.data
            })
            .addCase(postSave.fulfilled, (state, action) => {
                state.listSave.push(action.payload.data)
            })
            .addCase(editPass.fulfilled, (_, action) => {
                alert(`Thông báo: ${action.payload.message}`)
            })
            .addCase(editPass.rejected, (_, action) => {
                alert(`Thông báo: ${action.payload}`)
            })
            .addCase(editInfo.fulfilled, (_, action) => {
                alert(`Thông báo: ${action.payload.message}`)
            })
            .addCase(editInfo.rejected, (_, action) => {
                alert(`Thông báo: ${action.payload}`)
            })
            .addCase(uploadImange.fulfilled, (_, action) => {
                alert(`Thông báo: ${action.payload.message}`)
            })
            .addCase(uploadImange.rejected, (_, action) => {
                alert(`Thông báo: ${action.payload}`)
            })
    }
})



export default userSlice.reducer