import React, { Component } from 'react';

// chat line component
class ChatLine extends Component {
  render() {
    return (
      <form
        keys
        vi
        focused
        onSubmit={this.submit}
        top="90%"
        width="100%"
        height="10%"
        border={{ type: 'line' }}
        style={{ border: { fg: 'blue' } }}
      >
        <textbox onSubmit={this.props.sendMessage} keys mouse inputOnFocus />
      </form>
    );
  }
}

export default ChatLine;
