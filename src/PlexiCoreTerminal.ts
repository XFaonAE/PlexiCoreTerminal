import chalk from "chalk";
import CommandHelper from "./CommandHelper";
import Animation from "./Animation";
import * as readline from "readline";

/**
 * Options for creating a section
 */
export interface SectionOptions {
	/**
	 * @prop { string } barChar Character to use for the separator
	 */
	barChar?: string;

	/**
	 * @prop { string } barHex Hex code color for the separator
	 */
	barHex?: string;

	/**
	 * @prop { number } trailSize How many chars should the trailing bar be
	 */
	trailSize?: number;

	/**
	 * @prop { string } titleHex Hex code color for the title
	 */
	titleHex?: string;

	/**
	 * @prop { number } titlePadding Padding for the title between the separators
	 */
	titlePadding?: number;
}

export default class PlexiCoreTerminal {
	/**
	 * @var { CommandHelper } commandHelper CommandHelper class object
	 */
	public commandHelper: CommandHelper;

	/**
	 * @var { Animation } animation Animation class object
	 */
	public animation: Animation;

	/**
	 * @var rl Read line object
	 */
	public rl: any;

	/**
     	* PlexiCoreTerminal entry class
     	*/
    	public constructor() {
    		this.commandHelper = new CommandHelper(this);
    		this.animation = new Animation(this);
    		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: false
		});
	}

	/**
	 * Get text colored in hex format for the terminal
	 * @param { string } hex Hex code
	 * @param { string } text Text to re-color
	 * @return { string } Colored text ready for use in the terminal
	 */
	public color(hex: string, text: string) {
		return chalk.hex(hex)(text);
	}

	/**
	 * Create section
	 * @param { string } title Title of the section
	 * @param { object } options Options for the section
	 */
	public section(title: string, options?: SectionOptions) {
		const defaultOptions = {
			barChar: "─",
			barHex: "#555",
			trailSize: 10,
			titlePadding: 4,
			titleHex: "#fff"
		}

		let conf = {
			...defaultOptions,
			...options
		};
		let columns = process.stdout.columns;
		columns -= title.length;

		let trail = conf.barChar.repeat(conf.trailSize);
		columns -= trail.length;

		let padding = " ".repeat(conf.titlePadding);
		columns -= padding.length * 2;

		let tail = conf.barChar.repeat(columns);

		let full = this.color(conf.barHex, trail) + padding + this.color(conf.titleHex, title) + padding + this.color(conf.barHex, tail);
		process.stdout.write(full);
	}

	/**
	 * Create a row with a key and description
	 * @param { string } key Key label
	 * @param { string } desc Description label
	 */
	public row(key: string, desc: string) {
		console.log("  " + this.color("#50ffab", key) + "  -  " + desc);
	}

	/**
	 * Print a message to the console
	 * @param { string } message Message to print to the console
	 */
	public write(message: string) {
		process.stdout.write(this.color("#50ffab", "  i  ") + message + "\n");
	}

	/**
	 * Ask for user input form the console
	 * @param { string } question Question of ask from the user
	 * @param { CallableFunction } answerCallback Answer callback
	 */
	public ask(question: string, answerCallback: CallableFunction) {
		this.rl.question(this.color("#50ffab", "  >  ") + question + ":  ", (data: string) => {
			answerCallback(data);
		});
	}
}
