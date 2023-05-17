# REST API Backend

This is a simple backend server and client built with Node.js, Express.js, commander. It allows you to create, read, update and delete objects through a RESTful API.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- PostgreSQL (version 13 or later)

### Installing

1. Clone the repository: `git clone https://github.com/ren02144/Node-Server-Client.git`
2. Install dependencies: `npm install`

### Usage

1. Start the server under '/server': `npm run start`
2. Send requests to `http://localhost:8000` under '/client' path.

## API Reference

### API and Command

- `node index.js get <id>`: get object by id
- `node index.js create <title> <description>`: create new object with given title, description and a random id
- `node index.js delete <id>`: delete object by id
- `node index.js update <id> <title> <description>`: update object by id with given title and description

## Authors

- Liang REN - [ren02144](https://github.com/ren02144)
