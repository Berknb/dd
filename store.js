import { configureStore } from '@reduxjs/toolkit'
import PostSlice from './states/PostSlice'

export default configureStore({
  reducer: {
    postAdded: PostSlice
  },
})