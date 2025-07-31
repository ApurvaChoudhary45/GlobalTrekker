import { createSlice } from '@reduxjs/toolkit'

export const search = createSlice({
  name: 'country',
  initialState: {
    query: ''
  },
  reducers: {
    
    searchCountry: (state, action) => {
      state.query = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { searchCountry } = search.actions

export const searchReducer =  search.reducer