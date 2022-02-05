import React, { Component } from 'react';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <box
        width="100%"
        height="90%"
        top="0%"
        border={{ type: 'line' }}
        style={{ border: { fg: 'red' } }}
      >
        {this.props.messages}
      </box>
    );
  }
}

export default ChatWindow;
