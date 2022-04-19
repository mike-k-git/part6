import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  return anecdotes.map((anecdote) => (
    <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => dispatch(vote(anecdote.id))}
    />
  ))
}

export default AnecdoteList
