import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  removeTimeout: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
  },
})

export const { updateNotification } = notificationSlice.actions

export const setNotification = (text, time) => async (dispatch, getState) => {
  const { notification } = getState()
  if (notification.removeTimeout) {
    clearTimeout(notification.removeTimeout)
  }
  const removeTimeout = setTimeout(
    () => dispatch(updateNotification({ text: '', removeTimeout: null })),
    time * 1000
  )
  dispatch(updateNotification({ text, removeTimeout }))
}

export default notificationSlice.reducer
