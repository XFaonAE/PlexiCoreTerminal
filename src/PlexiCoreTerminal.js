"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var CommandHelper_1 = __importDefault(require("./CommandHelper"));
var PlexiCoreTerminal = /** @class */ (function () {
    /**
        * PlexiCoreTerminal entry class
        */
    function PlexiCoreTerminal() {
        this.commandHelper = new CommandHelper_1.default(this);
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
    PlexiCoreTerminal.prototype.animate = function (message) {
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
    PlexiCoreTerminal.prototype.end = function (status, newMessage) {
        var message = this.lastMessage;
        if (newMessage) {
            message = newMessage + " ".repeat(this.lastMessage.length - newMessage.length);
        }
        var statusHex = null;
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
    };
    /**
     * Get text colored in hex format for the terminal
     * @param { string } hex Hex code
     * @param { string } text Text to re-color
     * @return { string } Colored text ready for use in the terminal
     */
    PlexiCoreTerminal.prototype.color = function (hex, text) {
        return chalk_1.default.hex(hex)(text);
    };
    /**
     * Edit an animations message if it's running
     * @param { string } newMessage New message to use as an overwrite
     */
    PlexiCoreTerminal.prototype.edit = function (newMessage) {
        let repaceChars = newMessage.length - this.lastMessage.length;
        if (repaceChars < 0) {
            repaceChars = 0;
        }

        this.lastMessage = newMessage + " ".repeat(repaceChars);
    };
    /**
     * Create section
     * @param { string } title Title of the section
     * @param { object } options Options for the section
     */
    PlexiCoreTerminal.prototype.section = function (title, options) {
        var defaultOptions = {
            barChar: "─",
            barHex: "#555",
            trailSize: 10,
            titlePadding: 4,
            titleHex: "#fff"
        };
        var conf = __assign(__assign({}, defaultOptions), options);
        var columns = process.stdout.columns;
        columns -= title.length;
        var trail = conf.barChar.repeat(conf.trailSize);
        columns -= trail.length;
        var padding = " ".repeat(conf.titlePadding);
        columns -= padding.length * 2;
        var tail = conf.barChar.repeat(columns);
        var full = this.color(conf.barHex, trail) + padding + this.color(conf.titleHex, title) + padding + this.color(conf.barHex, tail);
        process.stdout.write(full);
    };
    /**
     * Create a row with a key and description
     * @param { string } key Key label
     * @param { string } desc Description label
     */
    PlexiCoreTerminal.prototype.row = function (key, desc) {
        console.log("  " + this.color("#50ffff", key) + "  -  " + desc);
    };
    return PlexiCoreTerminal;
}());
exports.default = PlexiCoreTerminal;
