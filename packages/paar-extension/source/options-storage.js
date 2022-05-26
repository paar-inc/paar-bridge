import OptionsSync from "webext-options-sync";

export default new OptionsSync({
	defaults: {
		text: "Set a text!",
	},
	migrations: [OptionsSync.migrations.removeUnused],
	logging: true,
});
