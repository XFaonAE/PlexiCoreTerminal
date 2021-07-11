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
        var pcTerminal = new PlexiCoreTerminal_1.default();
        pcTerminal.section("PlexiCore | " + "Terminal", {
            barHex: "#fff"
        });
        console.log(pcTerminal.color("#50ffff", "  Note:"), "This is a testing case");
        pcTerminal.animate("Hello Progress Bar");
        pcTerminal
            .commandHelper
            .addCommand({
            trigger: "hello-world",
            onTrigger: function () {
                pcTerminal.edit("The terminal message has been modified!");
            }
        });
        pcTerminal
            .commandHelper
            .run([
            "axeri",
            "plexiCoreTerminal",
            "test_command"
        ]);
    }
    return Test;
}());
