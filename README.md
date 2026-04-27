# Diesis PoWFaucet

Diesis-branded fork of [pk910/PoWFaucet](https://github.com/pk910/PoWFaucet) for the Diesis testnet.

This fork keeps the upstream PoW faucet engine but ships with Diesis-oriented defaults:

- Diesis repository metadata and source links
- DS / Diesis explorer defaults in the server config
- a ready-to-use Diesis sample config in `faucet-config.diesis.example.yaml`
- removal of the baked-in upstream GitHub star prompt from the default UI

## Scope

This repo is the self-serve PoW faucet only. For a larger authenticated drip, pair it with the GitHub faucet in the sibling [diesis-faucet](https://github.com/0xDiesis/diesis-faucet) repo.

## Quick Start

```bash
pnpm install
cp faucet-config.diesis.example.yaml faucet-config.yaml
# edit faucetSecret, ethRpcHost, ethWalletKey, and any operator-specific module settings
pnpm build-client
pnpm build
node dist/app.js
```

The default Diesis sample config assumes:

- chain ID `19803`
- native token symbol `DS`
- transaction explorer `https://explorer.testnet.diesis.xyz/tx/{txid}`

## Fork Layout

- `src/config/DefaultConfig.ts`: Diesis defaults used when config values are omitted
- `static/index.html`: default landing page shell and source ribbon
- `faucet-config.diesis.example.yaml`: operator sample for a Diesis deployment

## Upstream

Upstream remote is preserved as `upstream` and points to `pk910/PoWFaucet`. The local `origin` remote is preconfigured to `https://github.com/0xDiesis/diesis-powfaucet.git`, but creating or pushing that GitHub repo still requires valid GitHub auth in this environment.

## License

This fork remains under the upstream [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0).
