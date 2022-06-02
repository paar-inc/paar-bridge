import OptionsSync from "webext-options-sync";

export default new OptionsSync({
  defaults: {
    ethAddress: "N/A",
    transferAmountDollars: "N/A",
  },
  migrations: [OptionsSync.migrations.removeUnused],
  logging: true,
});
