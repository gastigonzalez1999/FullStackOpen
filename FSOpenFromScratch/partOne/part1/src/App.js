import logo from './logo.svg';
import './App.css';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Content = (props) => {
    console.log(props)
    return (
      <div>
        <h1>{props.name}</h1>
        <h1>{props.number}</h1>
      </div>
    )
  }

  const Header = (props) => {
    console.log(props)
    return <h1>{props.course}</h1>
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App