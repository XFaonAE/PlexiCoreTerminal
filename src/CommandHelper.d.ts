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
    commandRegistry: Array<Command>;
    /**
     * @var { boolean } ready Is the listener ready
     */
    ready: boolean;
    /**
     * Easily register commands and more
     */
    constructor();
    addCommand(command: Command): void;
    /**
     * Run listener
     * @param { Array<string> } command Full command with args
     * @param { RunOptions } runOptions Options for running the command
     */
    run(command: Array<string>, runOptions?: RunOptions): void;
}
