"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlexiCoreTerminal_1 = __importDefault(require("../src/PlexiCoreTerminal"));
var plexiCoreTerminal = new PlexiCoreTerminal_1.default();
plexiCoreTerminal.section("PlexiCoreTerminal | Test");
var timeLeft = 5;
var nextTick = function () {
    if (timeLeft == 0) {
        plexiCoreTerminal.animation.end("success", "PlexiCoreTerminal is done!");
        return;
    }
    plexiCoreTerminal.animation.edit("PlexiCoreTerminal can do many things | Stopping in " + timeLeft + "s");
    timeLeft -= 1;
    setTimeout(function () {
        nextTick();
    }, 1000);
};
plexiCoreTerminal.ask("What's your name?", function (data) {
    plexiCoreTerminal.write("Hello, " + data + "!");
    plexiCoreTerminal.animation.animate("PlexiCoreTerminal can do many things");
    nextTick();
});
