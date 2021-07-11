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
    plexiCoreTerminal: PlexiCoreTerminal;
    /**
     * @var { Array<Command> } commandRegistry Command registry list
     */
    commandRegistry: Array<Command>;
    /**
     * @var { boolean } ready Is the listener ready
     */
    ready: boolean;
    /**
     * Easily register commands and more
     */
    constructor(plexiCoreTerminal: PlexiCoreTerminal);
    /**
     * Add a command to the registry
     * @param { Command } command Command object
     * @return { CommandHelper } CommandHelper class object
     */
    addCommand(command: Command): this;
    /**
     * Run listener
     * @param { Array<string> } command Full command with args
     * @param { RunOptions } runOptions Options for running the command
     */
    run(command: Array<string>, runOptions?: RunOptions): this;
    /**
     * Generates help list based on current command registry
     * @return { CommandHelper } CommandHelper class object
     */
    helpPrint(): void;
}
