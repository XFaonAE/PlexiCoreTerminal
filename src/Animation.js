"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = /** @class */ (function () {
    /**
     * PlexiCoreTerminal entry class
     */
    function Animation(plexiCoreTerminal) {
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
    Animation.prototype.animate = function (message) {
        var _this = this;
        this.lastMessage = message;
        var currentFrame = 0;
        this.animationLoop = setInterval(function () {
            if (currentFrame > _this.frames.length - 1) {
                currentFrame = 0;
            }
            process.stdout.write("  " + _this.frames[currentFrame] + "  " + _this.lastMessage + "\r");
            currentFrame++;
        }, this.frameInterval);
    };
    /**
     * End the current running animation
     * @param { "success" | "warning" | "error" } status Status mode
     * @param { string } newMessage New message to write
     */
    Animation.prototype.end = function (status, newMessage) {
        var message = this.lastMessage;
        if (newMessage) {
            message = newMessage + " ".repeat(this.lastMessage.length >= 0 ? this.lastMessage.length : 0 - newMessage.length >= 0 ? newMessage.length : 0);
        }
        var statusHex = null;
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
    };
    /**
     * Edit an animations message if it's running
     * @param { string } newMessage New message to use as an overwrite
     */
    Animation.prototype.edit = function (newMessage) {
        this.lastMessage = newMessage + " ".repeat(newMessage.length >= 0 ? newMessage.length : 0 - this.lastMessage.length >= 0 ? this.lastMessage.length : 0);
    };
    return Animation;
}());
exports.default = Animation;
