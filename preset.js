const { Preset } = require('use-preset');

module.exports = Preset.make('preset-eslint')
    .option('typescript', false)

    .editJson('package.json')
        .title('Install ESLint & Prettier')
        .merge({
            scripts: {
                lint: 'eslint . --ext .js',
                fix: 'npm run lint -- --fix',
            },
            devDependencies: {
                'eslint': '^7.7.0',
                'eslint-config-prettier': '^6.11.0',
                'eslint-plugin-prettier': '^3.1.4',
                'eslint-plugin-simple-import-sort': '^5.0.3',
                'prettier': '^2.0.5',
            },
        })
        .chain()

    .editJson('package.json')
        .title('Install ESLint TypeScript dependencies')
        .merge({
            scripts: {
                lint: 'eslint . --ext .js --ext .ts',
                fix: 'npm run lint -- --fix',
            },
            devDependencies: {
                '@typescript-eslint/eslint-plugin': '^3.9.0',
                '@typescript-eslint/parser': '^3.9.0',
            },
        })
        .if(({ flags }) => Boolean(flags.typescript))
        .chain()

    .copyDirectory('default')
        .title('Copy ESLint config')
        .to('/')
        .whenConflict('ask')
        .chain()

    .copyDirectory('typescript')
        .to('/')
        .if(({ flags }) => Boolean(flags.typescript))
        .whenConflict('override')
        .title('Copy ESLint TypeScript config')
        .chain()

    .installDependencies();
