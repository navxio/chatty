<p align='center'>
<img width='256' src='https://user-images.githubusercontent.com/9297865/151686735-853abb5e-bbf3-4c1b-8506-9dda9ea0085c.png' />
</p>


<h2 align='center'>chatty</h2>
<br>

[![made with neovim](https://img.shields.io/badge/made_with-neovim-green?style=for-the-badge&logo=neovim)](https://neovim.io)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![released](https://img.shields.io/badge/released-no-orange?logo=npm)](npmjs.com/navxio/chatty-cli)

GPG encrypted, ephemeral, real time chatting in the terminal

### Features
* End to end encrypted
* Passwordless
* Real time
* vim like keybindings

### Requirements
* node.js >= 10
* npm
* GPG

### Installation
`npm i -g chatty-cli`

### Usage
`chatty <flags> arg`

### Example
`chatty --with <friend1@email.com>`

and

`chatty --connect <friend0@email.com>`

#### Flags
-w, --with <key-id>

Creates a live chat session with <key-id>

-c, --connect <key-id>
 
Joins a pre created session

-h, --help

Print the help information

-k, --default-key

specify a default gpg personal key if you have more than one

### Planned Features
- [ ] persisted chat
