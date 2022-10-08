import { createAsyncThunk } from '@reduxjs/toolkit'

import api from 'features/posts/api'
import { Post, PostFormInput } from 'features/posts/types'

export const createPost = createAsyncThunk<Post, PostFormInput>(
  'posts/create',
  async (newPost: PostFormInput, { rejectWithValue }) => {
    try {
      const post = await api.createPost(newPost)
      return post
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
