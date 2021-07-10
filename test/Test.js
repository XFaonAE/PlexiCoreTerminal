"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlexiCoreTerminal_1 = __importDefault(require("../src/PlexiCoreTerminal"));
new /** @class */ (function () {
    /**
     * Test class entry
     */
    function Test() {
        var plexiCoreTerminal = new PlexiCoreTerminal_1.default();
        plexiCoreTerminal.section("PlexiCoreTerminal");
        plexiCoreTerminal.animate("Hello, PlexiCoreTerminal!");
        setTimeout(function () {
            plexiCoreTerminal.end("success", "Done");
        }, 2000);
    }
    return Test;
}());
