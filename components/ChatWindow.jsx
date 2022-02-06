import React, { Component } from 'react';
import pkg from '../package';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <list
        scrollable={true}
        label={`chatty v${pkg.version}`}
        width="100%"
        height="93%"
        top="0%"
        items={this.props.messages}
        border={{ type: 'line' }}
      ></list>
    );
  }
}

export default ChatWindow;
