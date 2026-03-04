#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class BaseCommand {
    constructor(program, commandName, description) {
        this.program = program;
        this.commandName = commandName;
        this.description = description;
    }
}
class CalculatorCommands extends BaseCommand {
    constructor(program) {
        super(program, "calculator", "Perform arithmetic operations");
    }
    execute(...args) {
    }
    registerCommands() {
        this.program
            .command("add <n1> <n2>")
            .description("Add two numbers")
            .action((n1, n2) => {
            this.add(Number(n1), Number(n2));
        });
        this.program
            .command("sub <n1> <n2>")
            .description("Subtract two numbers")
            .action((n1, n2) => {
            this.subtract(Number(n1), Number(n2));
        });
        this.program
            .command("mul <n1> <n2>")
            .description("Multiply two numbers")
            .action((n1, n2) => {
            this.multiply(Number(n1), Number(n2));
        });
        this.program
            .command("div <n1> <n2>")
            .description("Divide two numbers")
            .action((n1, n2) => {
            this.divide(Number(n1), Number(n2));
        });
        this.program
            .command("pow <base> <exponent>")
            .description("Calculate power (base^exponent)")
            .action((base, exponent) => {
            this.power(Number(base), Number(exponent));
        });
        this.program
            .command("mod <n1> <n2>")
            .description("Get remainder of division")
            .action((n1, n2) => {
            this.modulo(Number(n1), Number(n2));
        });
    }
    add(n1, n2) {
        console.log("Result: " + (n1 + n2));
    }
    subtract(n1, n2) {
        console.log("Result: " + (n1 - n2));
    }
    multiply(n1, n2) {
        console.log("Result: " + (n1 * n2));
    }
    divide(n1, n2) {
        if (n2 === 0) {
            console.log("Error: Division by zero is not allowed!");
            return;
        }
        console.log("Result: " + (n1 / n2));
    }
    power(base, exponent) {
        console.log("Result: " + Math.pow(base, exponent));
    }
    modulo(n1, n2) {
        if (n2 === 0) {
            console.log("Error: Modulo by zero is not allowed!");
            return;
        }
        console.log("Result: " + (n1 % n2));
    }
}
class StringCommands extends BaseCommand {
    constructor(program) {
        super(program, "string", "String manipulation commands");
    }
    execute(...args) {
    }
    registerCommands() {
        this.program
            .command("greet <name>")
            .description("Greet a user by name")
            .action((name) => {
            this.greet(name);
        });
        this.program
            .command("uppercase <text>")
            .description("Convert text to uppercase")
            .action((text) => {
            this.toUpperCase(text);
        });
        this.program
            .command("lowercase <text>")
            .description("Convert text to lowercase")
            .action((text) => {
            this.toLowerCase(text);
        });
        this.program
            .command("reverse <text>")
            .description("Reverse a string")
            .action((text) => {
            this.reverseString(text);
        });
        this.program
            .command("count <text>")
            .description("Count characters in text")
            .action((text) => {
            this.countCharacters(text);
        });
        this.program
            .command("wordcount <text>")
            .description("Count words in text")
            .action((text) => {
            this.countWords(text);
        });
    }
    greet(name) {
        console.log("Hello, " + name + "! Welcome to mycli!");
    }
    toUpperCase(text) {
        console.log("Uppercase: " + text.toUpperCase());
    }
    toLowerCase(text) {
        console.log("Lowercase: " + text.toLowerCase());
    }
    reverseString(text) {
        console.log("Reversed: " + text.split("").reverse().join(""));
    }
    countCharacters(text) {
        console.log("Character count: " + text.length);
    }
    countWords(text) {
        const words = text.trim().split(/\s+/);
        console.log("Word count: " + (words[0] === "" ? 0 : words.length));
    }
}
class FileCommands extends BaseCommand {
    constructor(program) {
        super(program, "file", "File manipulation commands");
    }
    execute(...args) {
    }
    registerCommands() {
        this.program
            .command("fileinfo <filename>")
            .description("Get information about a file")
            .action((filename) => {
            this.getFileInfo(filename);
        });
        this.program
            .command("fileexists <filename>")
            .description("Check if a file exists")
            .action((filename) => {
            this.checkFileExists(filename);
        });
    }
    getFileInfo(filename) {
        try {
            const stats = fs.statSync(filename);
            console.log("File: " + path.basename(filename));
            console.log("Path: " + path.resolve(filename));
            console.log("Size: " + stats.size + " bytes");
            console.log("Created: " + stats.birthtime);
            console.log("Modified: " + stats.mtime);
            console.log("Is File: " + stats.isFile());
            console.log("Is Directory: " + stats.isDirectory());
        }
        catch (error) {
            console.log("Error: File not found - " + filename);
        }
    }
    checkFileExists(filename) {
        if (fs.existsSync(filename)) {
            console.log("File exists: " + filename);
        }
        else {
            console.log("File does not exist: " + filename);
        }
    }
}
class ApiCommands extends BaseCommand {
    constructor(program) {
        super(program, "api", "API integration commands");
    }
    execute(...args) {
    }
    registerCommands() {
        this.program
            .command("github <username>")
            .description("Get GitHub user information")
            .action((username) => {
            this.getGitHubInfo(username);
        });
        this.program
            .command("weather <city>")
            .description("Get weather information for a city")
            .action((city) => {
            this.getWeather(city);
        });
        this.program
            .command("quote")
            .description("Get a random inspirational quote")
            .action(() => {
            this.getQuote();
        });
        this.program
            .command("joke")
            .description("Get a random joke")
            .action(() => {
            this.getJoke();
        });
        this.program
            .command("dog")
            .description("Get a random dog image")
            .action(() => {
            this.getDogImage();
        });
    }
    async getGitHubInfo(username) {
        try {
            console.log("Fetching GitHub info for: " + username + "...");
            const response = await axios_1.default.get("https://api.github.com/users/" + username);
            const user = response.data;
            console.log("");
            console.log("=== GitHub User Info ===");
            console.log("Username: " + user.login);
            console.log("Name: " + (user.name || "Not provided"));
            console.log("Bio: " + (user.bio || "Not provided"));
            console.log("Location: " + (user.location || "Not provided"));
            console.log("Public Repos: " + user.public_repos);
            console.log("Followers: " + user.followers);
            console.log("Following: " + user.following);
            console.log("Profile URL: " + user.html_url);
            console.log("Created at: " + new Date(user.created_at).toDateString());
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("Error: User " + username + " not found on GitHub");
            }
            else {
                console.log("Error: Failed to fetch GitHub user info");
            }
        }
    }
    async getWeather(city) {
        try {
            console.log("Fetching weather for: " + city + "...");
            const geoResponse = await axios_1.default.get("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city));
            if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
                console.log("Error: City " + city + " not found");
                return;
            }
            const location = geoResponse.data.results[0];
            const weatherResponse = await axios_1.default.get("https://api.open-meteo.com/v1/forecast?latitude=" + location.latitude + "&longitude=" + location.longitude + "&current_weather=true");
            const weather = weatherResponse.data.current_weather;
            console.log("");
            console.log("=== Weather Info ===");
            console.log("City: " + location.name + ", " + location.country);
            console.log("Temperature: " + weather.temperature + "C");
            console.log("Wind Speed: " + weather.windspeed + " km/h");
            console.log("Weather: " + this.getWeatherDescription(weather.weathercode));
        }
        catch (error) {
            console.log("Error: Failed to fetch weather data");
        }
    }
    getWeatherDescription(code) {
        const codes = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Foggy",
            48: "Depositing rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",
            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",
            71: "Slight snow",
            73: "Moderate snow",
            75: "Heavy snow",
            80: "Rain showers",
            95: "Thunderstorm"
        };
        return codes[code] || "Unknown";
    }
    async getQuote() {
        try {
            console.log("Fetching random quote...");
            const response = await axios_1.default.get("https://dummyjson.com/quotes/random");
            const quote = response.data;
            console.log("");
            console.log("=== Random Quote ===");
            console.log("" + quote.quote + "");
            console.log("- " + quote.author);
        }
        catch (error) {
            console.log("Error: Failed to fetch quote");
        }
    }
    async getJoke() {
        try {
            console.log("Fetching random joke...");
            const response = await axios_1.default.get("https://dummyjson.com/jokes/random");
            const joke = response.data;
            console.log("");
            console.log("=== Random Joke ===");
            console.log(joke.joke);
        }
        catch (error) {
            console.log("Error: Failed to fetch joke");
        }
    }
    async getDogImage() {
        try {
            console.log("Fetching random dog image...");
            const response = await axios_1.default.get("https://dog.ceo/api/breeds/image/random");
            console.log("");
            console.log("=== Random Dog Image ===");
            console.log("Image URL: " + response.data.message);
        }
        catch (error) {
            console.log("Error: Failed to fetch dog image");
        }
    }
}
class UtilityCommands extends BaseCommand {
    constructor(program) {
        super(program, "utility", "Utility commands");
    }
    execute(...args) {
    }
    registerCommands() {
        this.program
            .command("random <min> <max>")
            .description("Generate a random number between min and max")
            .action((min, max) => {
            this.generateRandom(Number(min), Number(max));
        });
        this.program
            .command("uuid")
            .description("Generate a UUID")
            .action(() => {
            this.generateUUID();
        });
        this.program
            .command("datetime")
            .description("Get current date and time")
            .action(() => {
            this.getDateTime();
        });
    }
    generateRandom(min, max) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log("Random number between " + min + " and " + max + ": " + random);
    }
    generateUUID() {
        const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        console.log("UUID: " + uuid);
    }
    getDateTime() {
        const now = new Date();
        console.log("Current Date and Time:");
        console.log("Full: " + now.toString());
        console.log("ISO: " + now.toISOString());
        console.log("UTC: " + now.toUTCString());
        console.log("Date: " + now.toDateString());
        console.log("Time: " + now.toTimeString());
    }
}
class CLIManager {
    constructor() {
        this.program = new commander_1.Command();
        this.commands = [];
        this.setupProgram();
    }
    setupProgram() {
        this.program
            .name("mycli")
            .description("A fully functional CLI tool built with Node.js and TypeScript using OOP")
            .version("1.0.0");
        this.registerCommand(new CalculatorCommands(this.program));
        this.registerCommand(new StringCommands(this.program));
        this.registerCommand(new FileCommands(this.program));
        this.registerCommand(new ApiCommands(this.program));
        this.registerCommand(new UtilityCommands(this.program));
        this.program.on("--help", function () {
            console.log("");
            console.log("=== Available Commands ===");
            console.log("Math: add, sub, mul, div, pow, mod");
            console.log("String: greet, uppercase, lowercase, reverse, count, wordcount");
            console.log("File: fileinfo, fileexists");
            console.log("API: github, weather, quote, joke, dog");
            console.log("Utility: random, uuid, datetime");
            console.log("");
            console.log("Examples:");
            console.log("  mycli greet John");
            console.log("  mycli add 5 3");
            console.log("  mycli github octocat");
            console.log("  mycli weather London");
            console.log("  mycli quote");
        });
    }
    registerCommand(command) {
        command.registerCommands();
        this.commands.push(command);
    }
    run() {
        this.program.parse(process.argv);
    }
}
const cli = new CLIManager();
cli.run();
