import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import { reactRefresh } from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default defineConfig(
	{ ignores: ['dist'] },
	{
		files: ['**/*.{ts,tsx}'],
		extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, reactHooks.configs.flat.recommended, reactRefresh.configs.vite(), eslintConfigPrettier],
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'sort-imports': [
				'error',
				{
					ignoreCase: false,
					ignoreDeclarationSort: false,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
					allowSeparatedGroups: false,
				},
			],
			quotes: ['error', 'single'],
			'no-duplicate-imports': 'error',
			'@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
		},
	},
)
