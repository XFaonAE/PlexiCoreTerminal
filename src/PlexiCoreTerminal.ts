import chalk from "chalk";
import CommandHelper from "./CommandHelper";

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
	 * @var { NdeJS.Timer | null } animationLoop Animation loop object
	 */
	public animationLoop: NodeJS.Timer | null;

	/**
	 * @var { CommandHelper } commandHelper CommandHelper class object
	 */
	public commandHelper: CommandHelper;

	/**
	 * @var { number } frameInterval Delay between animation frames
	 */
	public frameInterval: number;

	/**
	 * @var { string } lastMessage Last printed message
	 */
	public lastMessage: string;

	/**
	 * @var { Array<string> } frames List of all the frames for the spinner animation
	 */
	public frames: Array<string>;
	
	/**
     	* PlexiCoreTerminal entry class
     	*/
    	public constructor() {
    		this.commandHelper = new CommandHelper(this);
		this.frameInterval = 70;
		this.animationLoop = null;
		this.lastMessage = "";
		this.frames = [
			this.color("#50ffff", "⠋"),
			this.color("#50ffff", "⠙"),
			this.color("#50ffff", "⠹"),
			this.color("#50ffff", "⠸"),
			this.color("#50ffff", "⠼"),
			this.color("#50ffff", "⠴"),
			this.color("#50ffff", "⠦"),
			this.color("#50ffff", "⠧"),
			this.color("#50ffff", "⠇"),
			this.color("#50ffff", "⠏")
		];
	}
	
	/**
	 * Display an animation
	 * @param { string } message Message to display with the animation
	 */
	public animate(message: string) {
		this.lastMessage = message;
		let currentFrame = 0;

		this.animationLoop = setInterval(() => {
			if (currentFrame > this.frames.length - 1) {
				currentFrame = 0;
			}

			process.stdout.write("  " + this.frames[currentFrame] + "  " + this.lastMessage + "\r");
			currentFrame++;
		}, this.frameInterval);
	}

	/**
	 * End the current running animation
	 * @param { "success" | "warning" | "error" } status Status mode
	 * @param { string } newMessage New message to write
	 */
	public end(status: "success" | "warning" | "error", newMessage?: string) {
		let message = this.lastMessage;
		if (newMessage) {
			message = newMessage + " ".repeat(this.lastMessage.length - newMessage.length);
		}

		let statusHex = null;
		switch (status) {
			case "success":
				statusHex = "#50ffff";
				break;

			case "warning":
				statusHex = "#ffff55";
				break;

			case "error":
				statusHex = "#ffff55";
				break;
		}

		if (this.animationLoop) {
			clearInterval(this.animationLoop);
		}

		process.stdout.write("\r  " + this.color(statusHex, "•") + "  " + message + "\n");
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
	 * Edit an animations message if it's running
	 * @param { string } newMessage New message to use as an overwrite
	 */
	public edit(newMessage: string) {
		this.lastMessage = newMessage + " ".repeat(newMessage.length - this.lastMessage.length);
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
		console.log("  " + this.color("#50ffff", key) + "  -  " + desc);
	}
}