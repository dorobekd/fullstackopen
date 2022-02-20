const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Content = ({ parts }) => (
Object.values(parts).map(({ name, exercises }) => <p key={name}>{name} {exercises}</p>)
)

const Total = ({ parts }) => (
  <p>Number of exercises {Object.values(parts).reduce((total, part) => total + part.exercises, 0)}</p>
)

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

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
