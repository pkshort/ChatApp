import React, { Component } from 'react';
import './App.css';

const instanceLocator = ""

const testToken = ""
const username = ""
const roomId = 0

class App extends Component {

  constructor() {
    super()
    this.state = {
      messages: DUMMY_DATA
    }
  }

  render() {
    return (
      <div className="app">
      <Title />
      <MessageList messages={this.state.messages}/>
      <SendMessageForm />
      </div>
    )
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    })

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }
}

const DUMMY_DATA = [
  {
    senderId: "John",
    text: "What's the score?"
  },
  {
    senderId: "Jane",
    text: "Who's playing?"
  }
]


class MessageList extends React.Component {
  render() {
    return (
      <ul className="message-list">
      {this.props.messages.map(message => {
        return (
          <li key={message.id}>
            <div>
              {message.senderId}
            </div>
            <div>
              {message.text}
            </div>
            </li>
        )
      })}
      </ul>
    )
  }
}


export default App;
