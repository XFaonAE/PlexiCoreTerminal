import PlexiCoreTerminal from "./PlexiCoreTerminal";

export default class Animation {
	/**
	 * @var { NdeJS.Timer | null } animationLoop Animation loop object
	 */
	public animationLoop: NodeJS.Timer | null;

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
	 * @var { PlexiCoreTerminal } plexiCoreTerminal PlexiCoreTerminal class object
	 */
	public plexiCoreTerminal: PlexiCoreTerminal;

	/**
	 * PlexiCoreTerminal entry class
	 */
	public constructor(plexiCoreTerminal: PlexiCoreTerminal) {
		this.plexiCoreTerminal = plexiCoreTerminal;
		this.frameInterval = 70;
		this.animationLoop = null;
		this.lastMessage = "";
		this.frames = [
			plexiCoreTerminal.color("#50ffff", "⠋"),
			plexiCoreTerminal.color("#50ffab", "⠙"),
			plexiCoreTerminal.color("#50ffab", "⠹"),
			plexiCoreTerminal.color("#50ffab", "⠸"),
			plexiCoreTerminal.color("#50ffab", "⠼"),
			plexiCoreTerminal.color("#50ffab", "⠴"),
			plexiCoreTerminal.color("#50ffab", "⠦"),
			plexiCoreTerminal.color("#50ffab", "⠧"),
			plexiCoreTerminal.color("#50ffab", "⠇"),
			plexiCoreTerminal.color("#50ffab", "⠏")
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
			message = newMessage + " ".repeat(this.lastMessage.length >= 0 ? this.lastMessage.length : 0 - newMessage.length >= 0 ? newMessage.length : 0);
		}

		let statusHex = null;
		switch (status) {
			case "success":
				statusHex = "#50ffab";
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

		process.stdout.write("\r  " + this.plexiCoreTerminal.color(statusHex, "•") + "  " + message + "\n");
	}

	/**
	 * Edit an animations message if it's running
	 * @param { string } newMessage New message to use as an overwrite
	 */
	public edit(newMessage: string) {
		this.lastMessage = newMessage + " ".repeat(newMessage.length >= 0 ? newMessage.length : 0 - this.lastMessage.length >= 0 ? this.lastMessage.length : 0);
	}
}