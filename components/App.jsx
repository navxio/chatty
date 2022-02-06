import React, { Component } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import ChatWindow from './ChatWindow';
import ChatLine from './ChatLine';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socket: props.data.socket,
    };

    props.data.socket.on('chat message', (message) => {
      this.setState((state) => {
        state.messages.push(message);
        return state;
      });
    });
  }

  sendMessage(message) {
    if (message) {
      this.state.socket.emit('chat message', {
        roomId: this.props.data.roomId,
        message,
      });
      this.setState((state) => {
        state.messages.push(message);
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
