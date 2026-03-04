#!/usr/bin/env node

import { Command } from "commander";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

abstract class BaseCommand {
  protected program: Command;
  protected commandName: string;
  protected description: string;

  constructor(program: Command, commandName: string, description: string) {
    this.program = program;
    this.commandName = commandName;
    this.description = description;
  }

  abstract execute(...args: any[]): void | Promise<void>;
  abstract registerCommands(): void;
}

class CalculatorCommands extends BaseCommand {
  constructor(program: Command) {
    super(program, "calculator", "Perform arithmetic operations");
  }

  execute(...args: any[]): void {
  }

  registerCommands(): void {
    this.program
      .command("add <n1> <n2>")
      .description("Add two numbers")
      .action((n1: string, n2: string) => {
        this.add(Number(n1), Number(n2));
      });

    this.program
      .command("sub <n1> <n2>")
      .description("Subtract two numbers")
      .action((n1: string, n2: string) => {
        this.subtract(Number(n1), Number(n2));
      });

    this.program
      .command("mul <n1> <n2>")
      .description("Multiply two numbers")
      .action((n1: string, n2: string) => {
        this.multiply(Number(n1), Number(n2));
      });

    this.program
      .command("div <n1> <n2>")
      .description("Divide two numbers")
      .action((n1: string, n2: string) => {
        this.divide(Number(n1), Number(n2));
      });

    this.program
      .command("pow <base> <exponent>")
      .description("Calculate power (base^exponent)")
      .action((base: string, exponent: string) => {
        this.power(Number(base), Number(exponent));
      });

    this.program
      .command("mod <n1> <n2>")
      .description("Get remainder of division")
      .action((n1: string, n2: string) => {
        this.modulo(Number(n1), Number(n2));
      });
  }

  private add(n1: number, n2: number): void {
    console.log("Result: " + (n1 + n2));
  }

  private subtract(n1: number, n2: number): void {
    console.log("Result: " + (n1 - n2));
  }

  private multiply(n1: number, n2: number): void {
    console.log("Result: " + (n1 * n2));
  }

  private divide(n1: number, n2: number): void {
    if (n2 === 0) {
      console.log("Error: Division by zero is not allowed!");
      return;
    }
    console.log("Result: " + (n1 / n2));
  }

  private power(base: number, exponent: number): void {
    console.log("Result: " + Math.pow(base, exponent));
  }

  private modulo(n1: number, n2: number): void {
    if (n2 === 0) {
      console.log("Error: Modulo by zero is not allowed!");
      return;
    }
    console.log("Result: " + (n1 % n2));
  }
}

class StringCommands extends BaseCommand {
  constructor(program: Command) {
    super(program, "string", "String manipulation commands");
  }

  execute(...args: any[]): void {
  }

  registerCommands(): void {
    this.program
      .command("greet <name>")
      .description("Greet a user by name")
      .action((name: string) => {
        this.greet(name);
      });

    this.program
      .command("uppercase <text>")
      .description("Convert text to uppercase")
      .action((text: string) => {
        this.toUpperCase(text);
      });

    this.program
      .command("lowercase <text>")
      .description("Convert text to lowercase")
      .action((text: string) => {
        this.toLowerCase(text);
      });

    this.program
      .command("reverse <text>")
      .description("Reverse a string")
      .action((text: string) => {
        this.reverseString(text);
      });

    this.program
      .command("count <text>")
      .description("Count characters in text")
      .action((text: string) => {
        this.countCharacters(text);
      });

    this.program
      .command("wordcount <text>")
      .description("Count words in text")
      .action((text: string) => {
        this.countWords(text);
      });
  }

  private greet(name: string): void {
    console.log("Hello, " + name + "! Welcome to mycli!");
  }

  private toUpperCase(text: string): void {
    console.log("Uppercase: " + text.toUpperCase());
  }

  private toLowerCase(text: string): void {
    console.log("Lowercase: " + text.toLowerCase());
  }

  private reverseString(text: string): void {
    console.log("Reversed: " + text.split("").reverse().join(""));
  }

  private countCharacters(text: string): void {
    console.log("Character count: " + text.length);
  }

  private countWords(text: string): void {
    const words = text.trim().split(/\s+/);
    console.log("Word count: " + (words[0] === "" ? 0 : words.length));
  }
}

class FileCommands extends BaseCommand {
  constructor(program: Command) {
    super(program, "file", "File manipulation commands");
  }

  execute(...args: any[]): void {
  }

  registerCommands(): void {
    this.program
      .command("fileinfo <filename>")
      .description("Get information about a file")
      .action((filename: string) => {
        this.getFileInfo(filename);
      });

    this.program
      .command("fileexists <filename>")
      .description("Check if a file exists")
      .action((filename: string) => {
        this.checkFileExists(filename);
      });
  }

  private getFileInfo(filename: string): void {
    try {
      const stats = fs.statSync(filename);
      console.log("File: " + path.basename(filename));
      console.log("Path: " + path.resolve(filename));
      console.log("Size: " + stats.size + " bytes");
      console.log("Created: " + stats.birthtime);
      console.log("Modified: " + stats.mtime);
      console.log("Is File: " + stats.isFile());
      console.log("Is Directory: " + stats.isDirectory());
    } catch (error: any) {
      console.log("Error: File not found - " + filename);
    }
  }

  private checkFileExists(filename: string): void {
    if (fs.existsSync(filename)) {
      console.log("File exists: " + filename);
    } else {
      console.log("File does not exist: " + filename);
    }
  }
}

class ApiCommands extends BaseCommand {
  constructor(program: Command) {
    super(program, "api", "API integration commands");
  }

  execute(...args: any[]): void | Promise<void> {
  }

  registerCommands(): void {
    this.program
      .command("github <username>")
      .description("Get GitHub user information")
      .action((username: string) => {
        this.getGitHubInfo(username);
      });

    this.program
      .command("weather <city>")
      .description("Get weather information for a city")
      .action((city: string) => {
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

  private async getGitHubInfo(username: string): Promise<void> {
    try {
      console.log("Fetching GitHub info for: " + username + "...");
      const response = await axios.get("https://api.github.com/users/" + username);
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
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.log("Error: User " + username + " not found on GitHub");
      } else {
        console.log("Error: Failed to fetch GitHub user info");
      }
    }
  }

  private async getWeather(city: string): Promise<void> {
    try {
      console.log("Fetching weather for: " + city + "...");
      
      const geoResponse = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city)
      );
      
      if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
        console.log("Error: City " + city + " not found");
        return;
      }
      
      const location = geoResponse.data.results[0];
      const weatherResponse = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=" + location.latitude + "&longitude=" + location.longitude + "&current_weather=true"
      );
      
      const weather = weatherResponse.data.current_weather;
      
      console.log("");
      console.log("=== Weather Info ===");
      console.log("City: " + location.name + ", " + location.country);
      console.log("Temperature: " + weather.temperature + "C");
      console.log("Wind Speed: " + weather.windspeed + " km/h");
      console.log("Weather: " + this.getWeatherDescription(weather.weathercode));
    } catch (error: any) {
      console.log("Error: Failed to fetch weather data");
    }
  }

  private getWeatherDescription(code: number): string {
    const codes: { [key: number]: string } = {
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

  private async getQuote(): Promise<void> {
    try {
      console.log("Fetching random quote...");
      const response = await axios.get("https://dummyjson.com/quotes/random");
      const quote = response.data;
      
      console.log("");
      console.log("=== Random Quote ===");
      console.log("" + quote.quote + "");
      console.log("- " + quote.author);
    } catch (error: any) {
      console.log("Error: Failed to fetch quote");
    }
  }

  private async getJoke(): Promise<void> {
    try {
      console.log("Fetching random joke...");
      const response = await axios.get("https://dummyjson.com/jokes/random");
      const joke = response.data;
      
      console.log("");
      console.log("=== Random Joke ===");
      console.log(joke.joke);
    } catch (error: any) {
      console.log("Error: Failed to fetch joke");
    }
  }

  private async getDogImage(): Promise<void> {
    try {
      console.log("Fetching random dog image...");
      const response = await axios.get("https://dog.ceo/api/breeds/image/random");
      
      console.log("");
      console.log("=== Random Dog Image ===");
      console.log("Image URL: " + response.data.message);
    } catch (error: any) {
      console.log("Error: Failed to fetch dog image");
    }
  }
}

class UtilityCommands extends BaseCommand {
  constructor(program: Command) {
    super(program, "utility", "Utility commands");
  }

  execute(...args: any[]): void {
  }

  registerCommands(): void {
    this.program
      .command("random <min> <max>")
      .description("Generate a random number between min and max")
      .action((min: string, max: string) => {
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

  private generateRandom(min: number, max: number): void {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("Random number between " + min + " and " + max + ": " + random);
  }

  private generateUUID(): void {
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c: string) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    console.log("UUID: " + uuid);
  }

  private getDateTime(): void {
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
  private program: Command;
  private commands: BaseCommand[];

  constructor() {
    this.program = new Command();
    this.commands = [];
    this.setupProgram();
  }

  private setupProgram(): void {
    this.program
      .name("mycli")
      .description("A fully functional CLI tool built with Node.js and TypeScript using OOP")
      .version("1.0.0");

    this.registerCommand(new CalculatorCommands(this.program));
    this.registerCommand(new StringCommands(this.program));
    this.registerCommand(new FileCommands(this.program));
    this.registerCommand(new ApiCommands(this.program));
    this.registerCommand(new UtilityCommands(this.program));

    this.program.on("--help", function() {
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

  private registerCommand(command: BaseCommand): void {
    command.registerCommands();
    this.commands.push(command);
  }

  public run(): void {
    this.program.parse(process.argv);
  }
}

const cli = new CLIManager();
cli.run();

