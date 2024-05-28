import { useState } from 'react'

const Winner = ({anecdotes, allVotes}) => {
  const highestVoteCount = Number(Math.max(...allVotes));
  const winnerIndex = allVotes.indexOf(highestVoteCount);
  const winner = anecdotes[winnerIndex];
  if (highestVoteCount == 0) {
    return (
      <p>No votes yet</p>
    )
    }

    return (
      <div>
        <p>{winner}</p>
        <p>has {Number(highestVoteCount)} votes</p>
      </div>
    )
};

const Anecdote = ({text, votesCount}) => {
  console.log('lets seeeeee',text);
  console.log('votes' ,votesCount);
  <div>
    <p>{text}</p>
    <p>has {Number(votesCount)} votes</p>
  </div>
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(anecdotes[0]);
  const [allVotes, setAllVotes] = useState(Array(6).fill(0));

const handleClick = () => {
  const randomNum = Math.floor(Math.random() * 6);
  console.log(randomNum);
  const randomAnecdote = anecdotes[randomNum];
  console.log(randomAnecdote);
  setSelected(randomAnecdote);
};

const handleVote = () => {
  const newAllVotes = [...allVotes];
  console.log(newAllVotes);
  newAllVotes[selected] += 1;
  console.log(newAllVotes);
  setAllVotes(newAllVotes);
};

  return (
    <div>
      <button onClick={handleClick}>Next one</button>
      <button onClick={handleVote}>Vote</button>
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <Winner anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  )
}

export default App
