import { defineConfig } from 'eslint/config';
import { fixupConfigRules } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    {
        extends: fixupConfigRules(
            compat.extends(
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:import/recommended',
                'plugin:jsx-a11y/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:import/errors',
                'plugin:import/warnings',
                'plugin:import/typescript',
                'eslint-config-prettier',
            ),
        ),

        settings: {
            react: {
                version: 'detect',
            },

            'import/resolver': {
                node: {
                    paths: ['node_modules', 'src'],
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    moduleDirectory: ['node_modules', 'src'],
                },
            },
        },

        rules: {
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                },
            ],

            'react/react-in-jsx-scope': 'off',
        },
    },
]);
