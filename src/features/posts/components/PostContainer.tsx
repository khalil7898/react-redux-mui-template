import Container from '@mui/material/Container'
import React from 'react'

import { usePostService } from 'features/posts/hooks'
import { PostFormInput } from 'features/posts/types'

export const PostContainer = () => {
  const { createPost, posts } = usePostService()
  console.log({ posts })
  return (
    <>
      <Container sx={{ py: 4 }} maxWidth="md">
        <button onClick={() => createPost({ title: 'title 1', body: 'body 1' } as PostFormInput)}>
          test dispatch thunk
        </button>
      </Container>
    </>
  )
}
