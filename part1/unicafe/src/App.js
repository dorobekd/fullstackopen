import { useState } from 'react';

const Header = ({ title }) => (
  <h1>{title}</h1>
)

const ButtonGroup = ({ buttons }) => {
  return buttons.map(({ label, handleClick }) => <Button key={label} onClick={handleClick} label={label} />)
}

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

const StatisticsLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ feedback }) => {
  const total = feedback.reduce((total, { value }) => total + value, 0)
  const average = !!total ? feedback.reduce((total, { value, score}) => total + value * score, 0) / total : 0
  const positive = !!total ? feedback.reduce((total, { value, score }) => total + (score > 0 ? value : 0), 0) / total : 0
  return !!total 
      ? (<table>
          <tbody>
            {feedback.map(({ label, value }) => <StatisticsLine key={label} text={label} value={value} />)}
            <StatisticsLine text={'all'} value={total} />
            <StatisticsLine text={'average'} value={average} />
            <StatisticsLine text={'positive'} value={`${positive * 100} %`} />
          </tbody>
        </table>) 
      : <p>No feedback given</p>
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 

  const feedback = [
    {
      label: 'good',
      value: good,
      handleClick: () => setGood(good + 1),
      score: 1
    },
    {
      label: 'neutral',
      value: neutral,
      handleClick: () => setNeutral(neutral + 1),
      score: 0
    },
    {
      label: 'bad',
      value: bad,
      handleClick: () => setBad(bad + 1),
      score: -1
    },
  ]

  return (
    <>
      <Header title={'Give Feedback'} />
      <ButtonGroup buttons={feedback} />
      <Header title={'Statistics'} />
      <Statistics feedback={feedback} />
    </>
  );
}

export default App;
