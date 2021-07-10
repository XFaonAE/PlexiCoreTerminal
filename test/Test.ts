import PlexiCoreTerminal from "../src/PlexiCoreTerminal";

new class Test {
    /**
     * Test class entry
     */
    public constructor() {
        const plexiCoreTerminal = new PlexiCoreTerminal();
        plexiCoreTerminal.section("PlexiCoreTerminal");
        plexiCoreTerminal.animate("Hello, PlexiCoreTerminal!");

        setTimeout(() => {
            plexiCoreTerminal.end("success", "Done");
        }, 2000);
    }
}