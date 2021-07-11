import PlexiCoreTerminal from "../src/PlexiCoreTerminal";

new class Test {
	/**
	 * Test class entry
	 */
	public constructor() {
		const pcTerminal = new PlexiCoreTerminal();
		pcTerminal.row("Help", "Shows a list of all commands");
		pcTerminal.row("Install", "Install the full PlexiCore framework into the current project");

		pcTerminal.section("PlexiCore | " + "Terminal");
		console.log(pcTerminal.color("#50ffff", "  Note:"), "This is a testing case");

		pcTerminal.animate("Hello Progress Bar");

		pcTerminal
			.commandHelper
			.addCommand({
				trigger: "hello-world",
				onTrigger: () => {
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
}