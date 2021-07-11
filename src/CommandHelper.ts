export interface RunOptions {

}

/**
 * Command object
 */
export interface Command {
	/**
	 * @prop { string } trigger Keyword in command line to trigger command
	 */
	trigger?: string;

	/**
	 * @prop { CallableFunction } onTrigger On command trigger event
	 */
	onTrigger?: CallableFunction;
}

export default class CommandHelper {
	/**
	 * @var { Array<Command> } commandRegistry Command registry list
	 */
	public commandRegistry: Array<Command>;

	/**
	 * @var { boolean } ready Is the listener ready
	 */
	public ready: boolean;

	/**
	 * Easily register commands and more
	 */
	public constructor() {
		this.ready = false;
		this.commandRegistry = [];
	}

	public addCommand(command: Command) {
		this.commandRegistry.push(command);
	}

	/**
	 * Run listener
	 * @param { Array<string> } command Full command with args
	 * @param { RunOptions } runOptions Options for running the command
	 */
	public run(command: Array<string>, runOptions?: RunOptions) {
		const commands = this.commandRegistry;
		const options = {
			prefixCommand: []
		};

		const startCommand = (commandUse: Array<string>) => {
			commands.forEach((value: any, index: number) => {
				if (value.trigger == commandUse[0]) {
					console.log("match");
				}
			});
		}

		if (options.prefixCommand.length > 0) {
			let ready = 0;
			let newCommand = [
				...command
			];
			options.prefixCommand.forEach((value: string, index: number) => {
				if (command[index]?.toLowerCase() == value?.toLowerCase()) {
					newCommand.shift();
					ready++;
				}

				if (ready == options.prefixCommand.length) {
					startCommand(newCommand);
				}
			});

			return;
		}

		startCommand(command);
	}
}