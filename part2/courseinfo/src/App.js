const Header = ({ course }) => (
  <h2>{course}</h2>
)

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => (
  Object.values(parts).map(({ id, name, exercises }) => <Part key={id} name={name} exercises={exercises} />)
)

const Total = ({ parts }) => (
  <p style={{ fontWeight: 'bold' }} >total of {parts.reduce((total, { exercises }) => total + exercises, 0)} exercises</p>
)

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App;