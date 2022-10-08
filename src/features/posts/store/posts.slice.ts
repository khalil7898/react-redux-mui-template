// DUCKS pattern
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createPost } from 'features/posts/store/posts.thunk'
import { Post } from 'features/posts/types'
import type { RootState } from 'store/store'

export interface PostsState {
  posts: Post[]
  isLoading: boolean
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchAllSucceeded(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createPost.fulfilled, (state, { payload: post }: PayloadAction<Post>) => {
        state.isLoading = false
        state.posts.push(post)
      })
      .addCase(createPost.pending, state => {
        state.isLoading = true
      })
      .addCase(createPost.rejected, state => {
        state.isLoading = false
      })
  },
})
console.log({ createPost })
// Actions
export const postsActions = {
  createPost,
}

// Selectors
export const selectPosts = (state: RootState) => state.posts.posts

// Reducer
export default postsSlice.reducer
