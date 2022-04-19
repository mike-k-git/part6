import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer'

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
        const removeTimeout = setTimeout(
          () => dispatch(removeNotification()),
          5000
        )
        dispatch(
          setNotification({
            text: `you voted '${anecdote.content}'`,
            removeTimeout,
          })
        )
      }}
    />
  ))
}

export default AnecdoteList
