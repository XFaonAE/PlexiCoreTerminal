"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandHelper = /** @class */ (function () {
    /**
     * Easily register commands and more
     */
    function CommandHelper(plexiCoreTerminal) {
        this.plexiCoreTerminal = plexiCoreTerminal;
        this.ready = false;
        this.commandRegistry = [];
    }
    /**
     * Add a command to the registry
     * @param { Command } command Command object
     * @return { CommandHelper } CommandHelper class object
     */
    CommandHelper.prototype.addCommand = function (command) {
        this.commandRegistry.push(command);
        return this;
    };
    /**
     * Run listener
     * @param { Array<string> } command Full command with args
     * @param { RunOptions } runOptions Options for running the command
     */
    CommandHelper.prototype.run = function (command, runOptions) {
        var commands = this.commandRegistry;
        var options = {
            prefixCommand: []
        };
        var startCommand = function (commandUse) {
            commands.forEach(function (value) {
                if (value.trigger == commandUse[0]) {
                    commandUse.shift();
                    value.onTrigger(commandUse);
                }
            });
        };
        if (options.prefixCommand.length > 0) {
            var ready_1 = 0;
            var newCommand_1 = __spreadArray([], command);
            options.prefixCommand.forEach(function (value, index) {
                var _a;
                if (((_a = command[index]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == (value === null || value === void 0 ? void 0 : value.toLowerCase())) {
                    newCommand_1.shift();
                    ready_1++;
                }
                if (ready_1 == options.prefixCommand.length) {
                    startCommand(newCommand_1);
                }
            });
            return this;
        }
        startCommand(command);
        return this;
    };
    /**
     * Generates help list based on current command registry
     * @return { CommandHelper } CommandHelper class object
     */
    CommandHelper.prototype.helpPrint = function () {
        var _this = this;
        this.commandRegistry.forEach(function (value) {
            _this.plexiCoreTerminal.row(value.trigger ? value.trigger : "NULL", value.desc ? value.desc : "NULL");
        });
    };
    return CommandHelper;
}());
exports.default = CommandHelper;
