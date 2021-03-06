import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'anecdote/createAnecdote',
      payload: 'test anecdote',
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map((a) => a.content)).toContainEqual(action.payload)
  })

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: 'test anecdote',
        votes: 0,
        id: 1,
      },
    ]
    const action = {
      type: 'anecdote/vote',
      payload: 1,
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
      content: 'test anecdote',
      id: 1,
      votes: 1,
    })
  })
})
