import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const sortAnecdotes = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state
        .map((a) => (a.id !== id ? a : changedAnecdote))
        .sort(sortAnecdotes)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
