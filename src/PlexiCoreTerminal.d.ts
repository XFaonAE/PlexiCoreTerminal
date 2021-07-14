import CommandHelper from "./CommandHelper";
import Animation from "./Animation";
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
    commandHelper: CommandHelper;
    /**
     * @var { Animation } animation Animation class object
     */
    animation: Animation;
    /**
     * @var rl Read line object
     */
    rl: any;
    /**
        * PlexiCoreTerminal entry class
        */
    constructor();
    /**
     * Get text colored in hex format for the terminal
     * @param { string } hex Hex code
     * @param { string } text Text to re-color
     * @return { string } Colored text ready for use in the terminal
     */
    color(hex: string, text: string): string;
    /**
     * Create section
     * @param { string } title Title of the section
     * @param { object } options Options for the section
     */
    section(title: string, options?: SectionOptions): void;
    /**
     * Create a row with a key and description
     * @param { string } key Key label
     * @param { string } desc Description label
     */
    row(key: string, desc: string): void;
    /**
     * Print a message to the console
     * @param { string } message Message to print to the console
     */
    write(message: string): void;
    /**
     * Ask for user input form the console
     * @param { string } question Question of ask from the user
     * @param { CallableFunction } answerCallback Answer callback
     */
    ask(question: string, answerCallback: CallableFunction): void;
}
