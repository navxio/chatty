import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import ChatScreen from './ChatScreen';

class App extends Component {
  render() {
    return (
      <ChatScreen />
    );
  }

}
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'chatty'
})

screen.key(['escape', 'q', 'C-c'], function () {
  return process.exit(0);
})

const component = render(<App />, screen);
