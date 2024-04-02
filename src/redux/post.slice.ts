import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Image from '../utils/image.type'
import http from '../utils/http'
import Comment from '../utils/constant'

export interface ImageState {
    listImage: Image[],
    commentList: Comment[]
}

const initialState: ImageState = {
    listImage: [],
    commentList: []
}

export const getList = createAsyncThunk('image/getPostList', async (_, thunkAPI) => {
    try {
        const { data } = await http.get('/post/images', {
            signal: thunkAPI.signal
        })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getComment = createAsyncThunk('image/getComment', async (imageId: String, thunkAPI) => {
    try {
        const { data } = await http.get(`/post/comments/${imageId}`, {
            signal: thunkAPI.signal
        })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const postComment = createAsyncThunk('image/postComment', async (model: { imageId: String, content: string} , thunkAPI) => {
    try {
        const { data } = await http.post(`/post/comments`, model ,{
            signal: thunkAPI.signal
        })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const delImage = createAsyncThunk('image/del-image', async (imageId: string, thunkAPI) => {
    try {
        const { data } = await http.delete(`/post/image/${imageId}` ,{
            signal: thunkAPI.signal
        })
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const delComment = createAsyncThunk('image/del-comment', async (commentId: string, thunkAPI) => {
    try {
        const { data } = await http.delete(`/post/comments/${commentId}`,{
            signal: thunkAPI.signal
        })
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getList.fulfilled, (state, action) => {
            state.listImage = action.payload.data
        })
        .addCase(getComment.fulfilled, (state, action) => {
            state.commentList = action.payload.data
        })
        .addCase(postComment.fulfilled, (state, action) => {
            state.commentList.push(action.payload.data)
        })
        .addCase(delImage.fulfilled, (_, action) => {
            alert(`Thông báo: ${action.payload.message}`)
            window.location.reload()
        })
        .addCase(delImage.rejected, (_, action) => {
            alert(`Thông báo: ${action.payload}`)
        })
        .addCase(delComment.fulfilled, (_, action) => {
            alert(`Thông báo: ${action.payload.message}`)
            window.location.reload()
        })
        .addCase(delComment.rejected, (_, action) => {
            alert(`Thông báo: ${action.payload}`)
        })
    }
})


export default imageSlice.reducer