# Output
Now let's start by learning about output control. When we logged messages and animations, we used the output logger which is really just the main class.

Here is a list of all the methods for displaying output:
 - [`row`](#row)
 - [`animate`](#animate)
 - [`edit`](#edit)
 - [`section`](#section)
 - [`color`](#color)
 - [`end`](#end)

Now let's cover each one of these methods

## `row`
Create a row with a key, best used for help lists and other table like structures.

### Usage
Param | Type | Desc
----- | ---- | ----
Key | `string` | Key label for the row
Desc | `string` | Description for the key label

### Example
```js
plexiCoreTerminal
	.row("The key", "The key's description");
```

## `animate`
This method allows you to create animated spinners in the terminal with a little message which are commonly used for loading indicators and many more.

### Usage
Param | Type | Desc
----- | ---- | ----
Message | `string` | A message to display along side with the spinner animation

### Example
```js
plexiCoreTerminal
	.animate("Hello, PlexiCoreTerminal!");
```

## `edit`
This method allows you to edit spinner's messages.<br />
**NOTE**: An animation in the terminal must be running first otherwise nothing will happen.

### Usage
Param | Type | Desc
----- | ---- | ----
New Message | `string` | Message to use for updating the spinner

### Example
```js
plexiCoreTerminal
	.animate("This is a message")
	.edit("The message has been changed");
```

## `section`
This method allows you to create section dividers in the terminal.

### Usage
Param | Type | Desc
----- | ---- | ----
Title | `string` | Title of the dividers header
Options | `?SectionOptions` | Options for the divider 

### Example
```js
plexiCoreTerminal
	.section("PlexiCoreTerminal");
```

## `color`
This method allows you to recolor text in the terminal.

### Usage
Param | Type | Desc
----- | ---- | ----
Hex Color Code | `string` | Hex color code for the text
Message | `string` | Message to re-color

### Example
```js
console.log(plexiCoreTerminal
	.color("This text is Cyan")
);
```

## `end`
This method allows you to indicate the spinner's success, warning or error status.<br />
**Note**: A spinner must be running for this to work.

### Usage
Param | Type | Desc
----- | ---- | ----
Status | `"success" | "warning" | "error"` | Status of the spinner
New Message | `?string` | Update to a new message

### Example
```js
plexiCoreTerminal
	.animate("This is a spinner")
	.end("success", "The spinner is done and successful");
```