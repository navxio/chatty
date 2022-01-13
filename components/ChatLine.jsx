import React, {Component} from 'react';

// chat line component
class ChatLine extends Component {

  submit() {

  }

  render() {
    return (
      <form
        keys
        vi
        focused
        onSubmit={this.submit}
        left="5%"
        top="5%"
        width="90%"
        height="10%"
        border={{type: 'line'}}
        style={{bg: 'cyan', border: {fg: 'blue'}}}>
        <textbox
          onSubmit={this.submit}
          keys
          mouse
          inputOnFocus
        />
      </form>);
    }
}

export default ChatLine;
