import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  removeTimeout: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      if (state.removeTimeout) {
        clearTimeout(state.removeTimeout)
      }
      const removeTimeout = action.payload.removeTimeout
      const text = action.payload.text
      return { text, removeTimeout }
    },
    removeNotification(state, action) {
      return { removeTimeout: null, text: '' }
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
