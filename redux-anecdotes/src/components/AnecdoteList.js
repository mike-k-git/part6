import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return anecdotes
    } else {
      return anecdotes.filter((a) =>
        a.content.toLowerCase().includes(filter.toLowerCase())
      )
    }
  })
  const dispatch = useDispatch()

  return anecdotes.map((anecdote) => (
    <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
      }}
    />
  ))
}

export default AnecdoteList
