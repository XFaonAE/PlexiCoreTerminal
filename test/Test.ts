import PlexiCoreTerminal from "../src/PlexiCoreTerminal";

new class Test {
	/**
	 * Test class entry
	 */
	public constructor() {
		const pcTerminal = new PlexiCoreTerminal();

		pcTerminal.section("PlexiCore | " + "Terminal", {
			barHex: "#fff"
		});
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