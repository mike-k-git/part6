import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  if (!notification.text) {
    return null
  }
  return <div style={style}>{notification.text}</div>
}

const mapStateToProps = ({ notification }) => {
  return {
    notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
