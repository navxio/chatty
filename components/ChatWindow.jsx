import React, { Component } from 'react';
import pkg from '../package';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <box
        scrollable={true}
        label={`chatty v${pkg.version}`}
        width="100%"
        height="93%"
        top="0%"
        border={{ type: 'line' }}
      >
        {this.props.messages.map((message, index) => (
          <text align="left" key={index}>
            you: {message}
          </text>
        ))}
      </box>
    );
  }
}

export default ChatWindow;
