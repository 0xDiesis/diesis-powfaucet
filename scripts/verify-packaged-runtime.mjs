import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import YAML from 'yaml';

assert.ok(process.argv[2], 'Pass the packaged executable path');
const executable = resolve(process.argv[2]);
const version = readFileSync(new URL('../.node-version', import.meta.url), 'utf8').trim();
const directory = mkdtempSync(join(tmpdir(), 'powfaucet-packaged-runtime-'));

try {
  const info = JSON.parse(execFileSync(executable, ['runtime-info'], {
    cwd: directory,
    encoding: 'utf8',
    timeout: 30_000,
  }));
  assert.deepEqual(info, {
    node: `v${version}`,
    platform: process.platform,
    arch: process.arch,
    sea: true,
  });

  execFileSync(executable, ['--create-config', '--datadir', directory], {
    cwd: directory,
    encoding: 'utf8',
    timeout: 30_000,
  });
  const config = YAML.parse(readFileSync(join(directory, 'faucet-config.yaml'), 'utf8'));
  assert.equal(config.version, 2);
  assert.equal(config.database.driver, 'sqlite');
  assert.match(config.ethWalletKey, /^[0-9a-f]{64}$/);
  assert.match(config.faucetSecret, /^[0-9a-f]{80}$/);
  console.log(`Verified packaged Node ${version}, ${info.platform}/${info.arch}, and embedded config asset`);
} finally {
  rmSync(directory, { recursive: true, force: true });
}
