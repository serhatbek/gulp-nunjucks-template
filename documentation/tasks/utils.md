# 🛠️ Utilities

The `utils.js` file contains helper functions that are used across the Gulp tasks for **logging messages** and **handling errors**.

**File:** `tasks/utils.js`

```js
const chalk = require("chalk");
const log = require("fancy-log");

const notifyMessage = (message) => {
  log(chalk.green.bold(`✅ ${message}`));
};

const onError = (taskName) => (err) => {
  log.error(chalk.red.bold(`❌ Error in ${taskName}:`));
  console.error(err.toString());
};

module.exports = { notifyMessage, onError };
```

### Functions

- `notifyMessage(message)`

  - Displays a green, bold message in your terminal.
  - ✅ Example: `notifyMessage("BrowserSync started")`

- `onError(taskName)`

  - Handles errors in your tasks gracefully.
  - Prints a red, bold error message with the task name.
  - Also logs the full error details to the console.

  Example usage:

  ```js
  const { onError } = require("./utils");

  someGulpTask.on("error", onError("someGulpTask"));
  ```

### Why this is useful:

- Keeps your terminal logs clear and readable
- Makes debugging Gulp tasks easier ⚡
- Provides consistent error and notification messages across tasks
