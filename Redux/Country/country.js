import { createSlice } from '@reduxjs/toolkit'

export const country = createSlice({
  name: 'earth',
  initialState: {
    country : [],
    cards:[]
  },
  reducers: {
    
    findCountry: (state, action) => {
      state.country = action.payload
    },
    findNews: (state, action) => {
      state.cards = action.payload
    }
    
  }
})

// Action creators are generated for each case reducer function
export const { findCountry, findNews } = country.actions

export const countryReducer =  country.reducer