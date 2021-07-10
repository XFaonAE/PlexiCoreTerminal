# Basic App
Now, we will create a simple test case to show what `PlexiCoreTerminal` can do.

```js
import PlexiCoreTerminal from "@axeridev/plexi-core-terminal";

const plexiCoreTerminal = new PlexiCoreTerminal();
plexiCoreTerminal.section("PlexiCoreTerminal | Test", {
    titleHex: "#50ffff"
});

plexiCoreTerminal.animate("PlexiCoreTerminal can do many things");
let timeLeft = 5;

const nextTick = () => {
    if (timeLeft == 0) {
        plexiCoreTerminal.end("success", "PlexiCoreTerminal is done!");
        return;
    }
    
    plexiCoreTerminal.edit("PlexiCoreTerminal can do many things | Stopping in " + timeLeft + "s");
    timeLeft -= 1;
    nextTick();
}

nextTick();
```

Let's break down what's happening here!
First, we are importing and constructing `PlexiCoreTerminal`.

Next we are creating a section divider, and then we make a simple count down and finally stop the animation.

 - Next []()
 - Prev [Installation](./Installation.md)