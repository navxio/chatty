import React, { Component } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import ChatWindow from './ChatWindow';
import ChatLine from './ChatLine';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  sendMessage(message) {
    if (message) {
      const socket = this.props.data.socket;
      socket.emit('chat message', { message });
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
