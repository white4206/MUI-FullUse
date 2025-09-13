import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
// 新增的插件
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
// 引入Prettier相关插件
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            // 替换为类型感知的配置
            ...tseslint.configs.recommendedTypeChecked,
            // 添加Prettier配置，必须放在最后以覆盖其他样式规则
            prettierConfig,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'react-x': reactX,
            'react-dom': reactDom,
            // 添加Prettier插件
            prettier: prettierPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            ...reactX.configs['recommended-typescript'].rules,
            ...reactDom.configs.recommended.rules,
            // 添加Prettier规则，将格式问题报告为错误
            'prettier/prettier': ['error', { endOfLine: 'auto' }], //行尾序列设为自动, 就不会因为lf,crlf不同行尾序列prettier检测冒红报错
            // 'prettier/prettier': 'error',
            'no-console': 'off',
            'no-debugger': 'off',
            'max-len': 'off',
            'no-multi-spaces': 'off', // 由Prettier处理
            'no-return-assign': 'off',
            semi: 'off', // 由Prettier处理
            eqeqeq: 'error',
            'jsx-quotes': 'off', // 由Prettier处理
            'import/prefer-default-export': 'off',
            'import/extensions': 'off',
            'import/no-unresolved': 'off',
            'no-multiple-empty-lines': 'off', // 由Prettier处理
            'no-param-reassign': 'off',
            '@typescript-eslint/no-shadow': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/indent': 'off', // 由Prettier处理
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
        },
    }
);
