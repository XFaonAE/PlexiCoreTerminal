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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var CommandHelper_1 = __importDefault(require("./CommandHelper"));
var Animation_1 = __importDefault(require("./Animation"));
var readline = __importStar(require("readline"));
var PlexiCoreTerminal = /** @class */ (function () {
    /**
        * PlexiCoreTerminal entry class
        */
    function PlexiCoreTerminal() {
        this.commandHelper = new CommandHelper_1.default(this);
        this.animation = new Animation_1.default(this);
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
    }
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
        console.log("  " + this.color("#50ffab", key) + "  -  " + desc);
    };
    /**
     * Print a message to the console
     * @param { string } message Message to print to the console
     */
    PlexiCoreTerminal.prototype.write = function (message) {
        process.stdout.write(this.color("#50ffab", "  i  ") + message + "\n");
    };
    /**
     * Ask for user input form the console
     * @param { string } question Question of ask from the user
     * @param { CallableFunction } answerCallback Answer callback
     */
    PlexiCoreTerminal.prototype.ask = function (question, answerCallback) {
        var _this = this;
        this.rl.question(this.color("#50ffab", "  >  ") + question + ":  ", function (data) {
            answerCallback(data);
            _this.rl.close();
        });
    };
    return PlexiCoreTerminal;
}());
exports.default = PlexiCoreTerminal;
