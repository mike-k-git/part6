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

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialize = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.create({ content, votes: 0 })
  dispatch(appendAnecdote(newAnecdote))
}

export default anecdoteSlice.reducer
