import { useCallback } from 'react'

import { postsActions, selectPosts } from 'features/posts/store'
import { Post, PostFormInput } from 'features/posts/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type PostServiceOperators = {
  posts: Post[]
  createPost: (data: PostFormInput) => void
}

export const usePostService = (): Readonly<PostServiceOperators> => {
  const dispatch = useAppDispatch()

  return {
    posts: useAppSelector(selectPosts),
    createPost: useCallback(
      (newPost: PostFormInput) => {
        dispatch(postsActions.createPost(newPost))
      },
      [dispatch],
    ),
  }
}

export default usePostService
