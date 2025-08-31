import { configureStore } from '@reduxjs/toolkit'
import { WebprojectsSlice } from './WebprojectsSlice'

export const store = configureStore({
  reducer: {
    WebProjects: WebprojectsSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch