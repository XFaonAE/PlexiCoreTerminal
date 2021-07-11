/// <reference types="node" />
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
    animationLoop: NodeJS.Timer | null;
    /**
     * @var { CommandHelper } commandHelper CommandHelper class object
     */
    commandHelper: CommandHelper;
    /**
     * @var { number } frameInterval Delay between animation frames
     */
    frameInterval: number;
    /**
     * @var { string } lastMessage Last printed message
     */
    lastMessage: string;
    /**
     * @var { Array<string> } frames List of all the frames for the spinner animation
     */
    frames: Array<string>;
    /**
     * PlexiCoreTerminal entry class
     */
    constructor();
    /**
     * Display an animation
     * @param { string } message Message to display with the animation
     */
    animate(message: string): void;
    /**
     * End the current running animation
     * @param { "success" | "warning" | "error" } status Status mode
     * @param { string } newMessage New message to write
     */
    end(status: "success" | "warning" | "error", newMessage?: string): void;
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
}
