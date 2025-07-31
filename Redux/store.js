import { configureStore } from '@reduxjs/toolkit'
import { countryReducer } from './Country/country'
import { searchReducer } from './Search/search'

export const store =  configureStore({
  reducer: {
    earth : countryReducer,
    country: searchReducer
  }
})