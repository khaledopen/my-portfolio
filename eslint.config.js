import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Anciennes sources (v1 .jsx et v2 « horizon ») : à supprimer avec `npm run cleanup:legacy`
  globalIgnores(['dist', 'src/**/*.jsx', 'src/utils/**', 'src/hooks/*.js', 'artwork', 'src/components/Intro.tsx', 'src/components/IntroContext.ts', 'src/components/HorizonPlate.tsx', 'src/animations', 'src/data/world.ts', 'src/components/ActHeading.tsx', 'src/components/Nav.tsx', 'src/components/ProjectCover.tsx', 'src/components/Avatar.tsx', 'src/components/ui', 'src/sections/Archive.tsx', 'src/sections/Journey.tsx', 'src/sections/Moments.tsx', 'src/sections/Philosophy.tsx', 'src/sections/Tools.tsx', 'src/pages/ProjectPage.tsx', 'src/lib/journey.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs['recommended-latest'], reactRefresh.configs.vite],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser }
  },
  {
    files: ['scripts/**/*.mjs'],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 2022, globals: globals.node }
  }
]);
