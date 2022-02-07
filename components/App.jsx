import React, { Component } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import ChatWindow from './ChatWindow';
import ChatLine from './ChatLine';
const gpg = require('../gpg');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socket: props.data.socket,
      target: this.props.data.target,
      username: this.props.data.username,
    };

    props.data.socket.on('chat message', (encryptedMessage) => {
      gpg.decryptMessage(encryptedMessage).then((decryptedMessage) => {
        // decrypt it
        this.setState((state) => {
          state.messages.push(this.state.target + ': ' + decryptedMessage);
          return state;
        });
      });
    });
  }

  async sendMessage(message) {
    const encryptedMessage = await gpg.encryptMessage(
      message,
      this.state.target
    );

    if (message) {
      this.state.socket.emit('chat message', {
        roomId: this.props.data.roomId,
        message: encryptedMessage,
      });
      this.setState((state) => {
        state.messages.push(this.state.username + ': ' + message);
        return state;
      });
    }
  }

  render() {
    return (
      <>
        <ChatWindow messages={this.state.messages} />
        <ChatLine sendMessage={this.sendMessage.bind(this)} />
      </>
    );
  }
}

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'chatty',
});

screen.key(['escape', 'q', 'C-c'], function () {
  return process.exit(0);
});

module.exports = (data) => {
  render(<App data={data} />, screen);
};
