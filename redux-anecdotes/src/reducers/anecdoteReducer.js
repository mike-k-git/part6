import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const initialState = []

const sortAnecdotes = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state
        .map((a) => (a.id !== id ? a : action.payload))
        .sort(sortAnecdotes)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initialize = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.create({ content, votes: 0 })
  dispatch(appendAnecdote(newAnecdote))
}

export const vote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.update(anecdote)
  dispatch(updateAnecdote(updatedAnecdote))
}

export default anecdoteSlice.reducer
