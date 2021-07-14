/// <reference types="node" />
import PlexiCoreTerminal from "./PlexiCoreTerminal";
export default class Animation {
    /**
     * @var { NdeJS.Timer | null } animationLoop Animation loop object
     */
    animationLoop: NodeJS.Timer | null;
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
     * @var { PlexiCoreTerminal } plexiCoreTerminal PlexiCoreTerminal class object
     */
    plexiCoreTerminal: PlexiCoreTerminal;
    /**
     * PlexiCoreTerminal entry class
     */
    constructor(plexiCoreTerminal: PlexiCoreTerminal);
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
     * Edit an animations message if it's running
     * @param { string } newMessage New message to use as an overwrite
     */
    edit(newMessage: string): void;
}
