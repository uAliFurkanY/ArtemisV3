const { readdirSync } = require("fs");
const format = require("prettier")?.format;
const { join } = require("path");
let MD = `# Commands for Artemis V3\n`;
const PREFIX = process.argv[2] || "!";
const COMMANDS_DIR = join(__dirname, "commands");
const categories = readdirSync(COMMANDS_DIR);
categories.forEach(cat => {
	const commands = readdirSync(join(COMMANDS_DIR, cat)).map(cmd =>
		require(join(COMMANDS_DIR, cat, cmd))
	);
	MD += `## Category \`${cat}\`\n`;
	commands.forEach(command => {
		MD += `### Command \`${command.name}\`
#### Permission Level: ${command.permission}
#### Description:
\`\`\`
${command.explain}
\`\`\`\n`;
	});
});
console.log(
	(format
		? format(MD, {
				parser: "markdown",
		  })
		: MD
	).replace(/\(PREFIX\)/g, PREFIX)
);
