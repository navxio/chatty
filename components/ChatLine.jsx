import React, { Component } from 'react';

// chat line component
class ChatLine extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.submit = (msgString) => {
      this.props.sendMessage(msgString);
      this.myRef.current.clearValue();
      this.myRef.current.focus();
    };
    this.cancel = (_) => console.log('form cancelled');
  }

  componentDidMount() {
    this.myRef.current.focus();
  }

  render() {
    return (
      <form
        keys
        vi
        focused
        label={'type your message and press <enter>'}
        onSubmit={this.submit}
        onReset={this.cancel}
        top="93%"
        width="100%"
        height="7%"
        border={{ type: 'line' }}
      >
        <textbox
          ref={this.myRef}
          onSubmit={this.submit}
          keys
          mouse
          inputOnFocus
        />
      </form>
    );
  }
}

export default ChatLine;
