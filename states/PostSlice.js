import { createSlice } from '@reduxjs/toolkit'

export const PostSlice = createSlice({
  name: 'postAdded',
  initialState: {
    value: 0,
  },
  reducers: {
    postAdded: (state) => {
      state.value += 1;
    }
  },
})

// Action creators are generated for each case reducer function
export const { postAdded } = PostSlice.actions

export default PostSlice.reducer