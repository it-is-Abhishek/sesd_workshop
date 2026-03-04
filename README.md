# mycli - A Fully Functional CLI Tool

A command-line interface tool built with Node.js and TypeScript using Object-Oriented Programming (OOP) concepts.

## Features

### Core Requirements
- OOP Structure: Built using classes, inheritance, and object creation
- 10+ Commands: Multiple command categories implemented

#### 1.### Command Categories

 Math Commands (6 commands)
| Command | Description | Example |
|---------|-------------|---------|
| add n1 n2 | Add two numbers | mycli add 5 3 |
| sub n1 n2 | Subtract two numbers | mycli sub 10 4 |
| mul n1 n2 | Multiply two numbers | mycli mul 6 7 |
| div n1 n2 | Divide two numbers | mycli div 20 4 |
| pow base exponent | Calculate power | mycli pow 2 8 |
| mod n1 n2 | Get remainder | mycli mod 17 5 |

#### 2. String Commands (6 commands)
| Command | Description | Example |
|---------|-------------|---------|
| greet name | Greet a user | mycli greet John |
| uppercase text | Convert to uppercase | mycli uppercase hello |
| lowercase text | Convert to lowercase | mycli lowercase HELLO |
| reverse text | Reverse a string | mycli reverse hello |
| count text | Count characters | mycli count hello |
| wordcount text | Count words | mycli wordcount "hello world" |

#### 3. File Commands (2 commands)
| Command | Description | Example |
|---------|-------------|---------|
| fileinfo filename | Get file information | mycli fileinfo package.json |
| fileexists filename | Check if file exists | mycli fileexists README.md |

#### 4. API Integration Commands (5 commands)
| Command | Description | Example |
|---------|-------------|---------|
| github username | Get GitHub user info | mycli github octocat |
| weather city | Get weather data | mycli weather London |
| quote | Get random quote | mycli quote |
| joke | Get random joke | mycli joke |
| dog | Get random dog image | mycli dog |

#### 5. Utility Commands (3 commands)
| Command | Description | Example |
|---------|-------------|---------|
| random min max | Generate random number | mycli random 1 100 |
| uuid | Generate UUID | mycli uuid |
| datetime | Get current date/time | mycli datetime |

## API Integrations

This CLI tool integrates with 5 different APIs:

1. GitHub API - Get user information (public repos, followers, etc.)
2. Open-Meteo Weather API - Get current weather for any city (free, no API key required)
3. DummyJSON Quotes API - Get random inspirational quotes
4. DummyJSON Jokes API - Get random jokes
5. Dog CEO API - Get random dog images

## Installation

```bash

cd sesd_workshop2


npm install


npm run build


npm link
```

## Usage

After building or linking:

```bash

node dist/index.js command


mycli command
```

## OOP Implementation

The project demonstrates the following OOP concepts:

1. Abstract Base Class: BaseCommand - defines the interface for all commands
2. Class Inheritance: CalculatorCommands, StringCommands, FileCommands, ApiCommands, UtilityCommands extend BaseCommand
3. Encapsulation: Private methods and properties within classes
4. Polymorphism: Each command class implements registerCommands() differently
5. Object Creation: CLIManager creates and manages command objects

### Class Structure

```
BaseCommand (abstract)
├── CalculatorCommands
├── StringCommands
├── FileCommands
├── ApiCommands
└── UtilityCommands

CLIManager (manages all commands)
```

## Project Structure

```
sesd_workshop2/
├── index.ts          # Main source code (OOP implementation)
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
├── dist/
│   └── index.js     # Compiled JavaScript
└── README.md         # This file
```

## License

ISC

