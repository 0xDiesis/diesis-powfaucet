import { FaucetDbDriver } from "../db/FaucetDatabase.js";
import { FaucetCoinType } from "../eth/EthWalletManager.js";
import { IConfigSchema } from "./ConfigSchema.js";
import { resolveRelativePath } from "./FaucetConfig.js";

export function getDefaultConfig(): IConfigSchema {
  return {
    version: 2,

    appBasePath: null,
    faucetVersion: "",
    staticPath: resolveRelativePath("~app/static"),
    faucetPidFile: null, // path to file to write the process pid to

    buildSeoIndex: true,
    buildSeoMeta: {},
    database: {
      driver: FaucetDbDriver.SQLITE,
      file: resolveRelativePath("faucet-store.db"),
    },

    faucetTitle: "Diesis Testnet Faucet",
    faucetImage: "",
    faucetHomeHtml: '<div class="pow-info"><h5>Diesis Testnet</h5>Mine a short proof of work in your browser to claim DS for testing on Diesis.</div>',
    faucetCoinSymbol: "DS",
    faucetCoinType: FaucetCoinType.NATIVE,
    faucetCoinContract: null,
    faucetLogFile: null,
    faucetLogStatsInterval: 600,
    serverPort: 8080,
    httpProxyCount: 0,
    faucetSecret: null, // mandatory

    ethRpcHost: null, // mandatory
    ethWalletKey: null, // mandatory
    ethChainId: null,
    ethTxGasLimit: 100000,
    ethLegacyTx: false,
    ethTxMaxFee: 100000000000,
    ethTxPrioFee: 2000000000,
    ethMaxPending: 20,
    ethQueueNoFunds: false,
    ethTxExplorerLink: "https://explorer.testnet.diesis.xyz/tx/{txid}",

    maxDropAmount: 1000000000000000000, // 1 native token
    minDropAmount: 10000000000000000, // 0.01 native token
    sessionTimeout: 86400,
    sessionCleanup: 2592000,
    sessionSaveTime: 120,

    modules: {},

    spareFundsAmount: 10000000000000000, // 0.01 native token
    noFundsBalance: 100000000000000000, // 0.1 native token
    lowFundsBalance: 10000000000000000000, // 10 native tokens
    lowFundsWarning: true,
    noFundsError: true,
    rpcConnectionError: true,
    denyNewSessions: false,
    corsAllowOrigin: [],
    ethRefillContract: null,
    faucetStats: null,
    faucetStatus: {
      json: "faucet-status.json",
      yaml: "faucet-status.yaml",
    },
    resultSharing: {
      preHtml: "",
      postHtml: '',
      caption: null,
    },
  };
}
