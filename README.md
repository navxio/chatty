## chatty

GPG encrypted, ephemeral, real time chatting in the terminal

### Features
* End to end encrypted
* Passwordless
* Real time
* modern, minimal TUI written in React

### Requirements
* node.js >= 10
* npm
* GPG

### Installation
`npm i -g chatty-cli`

### Usage
`chatty <flags> arg`

#### Flags
-i, --init <key-id>

creates a live chat session with <key-id>

-c, --connect <key-id>
 
joins a pre created session

-h, --help
Print the help information

Run without flag to enter a key chooser screen

### Planned Features
* persistent sessions
