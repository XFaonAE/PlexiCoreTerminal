import PlexiCoreTerminal from "./PlexiCoreTerminal";

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

	/**
	 * @prop { string } desc Description for the command
	 */
	desc?: string;
}

export default class CommandHelper {
	/**
	 * @var { PlexiCoreTerminal } plexiCoreTerminal PlexiCoreTerminal class object
	 */
	public plexiCoreTerminal: PlexiCoreTerminal;

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
	public constructor(plexiCoreTerminal: PlexiCoreTerminal) {
		this.plexiCoreTerminal = plexiCoreTerminal;
		this.ready = false;
		this.commandRegistry = [];
	}

	/**
	 * Add a command to the registry
	 * @param { Command } command Command object
	 * @return { CommandHelper } CommandHelper class object
	 */
	public addCommand(command: Command) {
		this.commandRegistry.push(command);
		return this;
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
			commands.forEach((value: any) => {
				if (value.trigger == commandUse[0]) {
					commandUse.shift();
					value.onTrigger(commandUse);
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

			return this;
		}

		startCommand(command);
		return this;
	}

	/**
	 * Generates help list based on current command registry
	 * @return { CommandHelper } CommandHelper class object
	 */
	public helpPrint() {
		this.commandRegistry.forEach((value: Command) => {
			this.plexiCoreTerminal.row(value.trigger ? value.trigger : "NULL", value.desc ? value.desc : "NULL");
		});
	}
}