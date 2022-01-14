import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import pkg from '../package.json'
import ChatLine from './ChatLine';
import ChatWindow from './ChatWindow';

class App extends Component {
  render() {
    return (
      <>
      <ChatWindow />
      <ChatLine />
      </>
    );
  }

}
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'chatty v' + pkg.version
})

screen.key(['escape', 'q', 'C-c'], function () {
  return process.exit(0);
})

const component = render(<App />, screen);
