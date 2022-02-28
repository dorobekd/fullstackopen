function Notification({ message, error }) {
  return message
    ? (
      <div style={error ? errorStyle : notificationStyle}>
        {message}
      </div>
    ) : null
}

const notificationStyle = {
  color: 'green',
  backgroundColor: 'lightGrey',
  fontStyle: 'bold',
  fontSize: 20,
  border: '2px solid green',
}
const errorStyle = {
  color: 'red',
  backgroundColor: 'lightGrey',
  fontStyle: 'bold',
  fontSize: 20,
  border: '2px solid red',
}
export default Notification
