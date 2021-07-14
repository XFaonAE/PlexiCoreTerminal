import PlexiCoreTerminal from "../src/PlexiCoreTerminal";

const plexiCoreTerminal = new PlexiCoreTerminal();
plexiCoreTerminal.section("PlexiCoreTerminal | Test");

let timeLeft = 5;

const nextTick = () => {
	if (timeLeft == 0) {
		plexiCoreTerminal.animation.end("success", "PlexiCoreTerminal is done!");
		return;
	}

	plexiCoreTerminal.animation.edit("PlexiCoreTerminal can do many things | Stopping in " + timeLeft + "s");
	timeLeft -= 1;
	setTimeout(() => {
		nextTick();
	}, 1000);
}

plexiCoreTerminal.ask("What's your name?", (data: string) => {
	plexiCoreTerminal.write("Hello, " + data + "!");
	plexiCoreTerminal.animation.animate("PlexiCoreTerminal can do many things");
	nextTick();
});