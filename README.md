<p align='center'>
<img src='https://user-images.githubusercontent.com/9297865/151671270-f8130da4-6842-461f-bf29-df4fe1cc6fed.png' />
</p>

<h2 align='center'>chatty</h2>

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

Creates a live chat session with <key-id>

-c, --connect <key-id>
 
Joins a pre created session

-h, --help

Print the help information

Run without flag to enter a key chooser screen

### Planned Features
* persistent sessions
