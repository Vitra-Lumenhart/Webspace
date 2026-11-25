import {runTests} from "../worlds/gringotts/ledger-model.mjs";
const tests=runTests(); console.log(JSON.stringify({passed:tests.length,tests},null,2));
