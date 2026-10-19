#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, 'utf-8').trim();

console.log('\n📝 Vérification du format du message de commit...\n');

try {
  execSync(`npx commitlint --edit ${commitMsgFile}`, {
    stdio: 'pipe',
    encoding: 'utf-8',
  });
  console.log('✅ Message de commit valide.\n');
  process.exit(0);
} catch (error) {
  console.error(
    '\n❌ ERREUR: Le message de commit ne respecte pas le format requis.\n',
  );
  console.error(
    '- Le message doit suivre le format: <type>(<scope>): <description>',
  );
  console.error('Voir CONTRIBUTING.md pour plus de détails.\n');
  process.exit(1);
}
