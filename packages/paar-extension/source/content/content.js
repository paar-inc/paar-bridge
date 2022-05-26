import optionsStorage from "../options-storage.js";

async function init() {
  const options = await optionsStorage.getAll();
  console.info("content", options);
}

init();
