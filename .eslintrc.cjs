module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
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
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
	},
	parserOptions: {
		project: ['./tsconfig.json'],
	},
}
