import { useState } from 'react'

const Anecdote = ({ text })  => <p>{text}</p>

const Vote = ({ amount }) => <p>has {amount} votes.</p>

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const generateRandomNumber = (range) => Math.floor(Math.random() * range)

  const getNextAnecdote = () => {
    const nextAnecdote = generateRandomNumber(anecdotes.length)
    return selected === nextAnecdote ? getNextAnecdote(anecdotes.length) : setSelected(nextAnecdote)
  }
  
  const voteForAnecdote = () => {
    const newVotes = votes.map((vote, index) => index === selected ? vote + 1 : vote )
    setVotes(newVotes);
  }

  const getAnecdoteOftheDay = () => anecdotes[votes.indexOf(Math.max(...votes))]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} />
      <Vote amount={votes[selected]} />
      <Button label={'Vote'} onClick={voteForAnecdote} />
      <Button label={'Next anecdote'} onClick={getNextAnecdote} />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={getAnecdoteOftheDay()} />
      <Vote amount={votes[selected]} />
    </div>
  )
}

export default App