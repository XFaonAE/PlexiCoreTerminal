"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlexiCoreTerminal_1 = __importDefault(require("../src/PlexiCoreTerminal"));
var plexiCoreTerminal = new PlexiCoreTerminal_1.default();
plexiCoreTerminal.section("PlexiCoreTerminal | Test", {
    titleHex: "#50ffff"
});
plexiCoreTerminal.animate("PlexiCoreTerminal can do many things");
var timeLeft = 5;
var nextTick = function () {
    if (timeLeft == 0) {
        plexiCoreTerminal.end("success", "PlexiCoreTerminal is done!");
        return;
    }
    plexiCoreTerminal.edit("PlexiCoreTerminal can do many things | Stopping in " + timeLeft + "s");
    timeLeft -= 1;
    setTimeout(function () {
        nextTick();
    }, 1000);
};
nextTick();
