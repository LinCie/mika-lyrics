export const apps = [
	{
		name: "mika-lyrics",
		script: ".dist/index.js",
		interpreter: "bun",
		env: {
			PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`,
		},
		watch: false,
		autorestart: true,
		max_memory_restart: "64M",
	},
];
