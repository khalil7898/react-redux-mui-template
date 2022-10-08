import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

import { Post, PostFormInput } from 'features/posts/types'

export const createPost = createAsyncThunk<Post, PostFormInput>(
  'posts/createPost',
  async (newPost: PostFormInput, { rejectWithValue }) => {
    try {
      await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      return { id: nanoid(), ...newPost }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
