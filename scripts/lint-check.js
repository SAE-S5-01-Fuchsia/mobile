#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('\n🔍 Vérification du code avec ESLint...\n');

try {
  execSync('npx eslint . --ext .js,.jsx,.ts,.tsx --max-warnings=0', {
    stdio: 'inherit',
    encoding: 'utf-8',
  });
  console.log('✅ Aucune erreur ESLint détectée. Le commit peut continuer.\n');
  process.exit(0);
} catch (error) {
  console.error('\n❌ ERREUR: Le linter a détecté des problèmes dans le code.');
  console.error(
    '- Run: npm run lint:fix pour fix automatiquement les petits problèmes. \n',
  );
  process.exit(1);
}
