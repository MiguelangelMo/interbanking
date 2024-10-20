// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/tests/**',
        '!**/coverage/**',
        '!jest.config.js',
        '!babel.config.js',
        '!jest.setup.js',
    ],
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcovonly'],
    coverageDirectory: './coverage',
    moduleNameMapper: {
        '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFiles: ['<rootDir>/tests/setup.ts', 'raf/polyfill'],
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.ts'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/.jest.setup.js/',
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/babel.config.js/',
    ],
    reporters: ['default'],
    modulePathIgnorePatterns: [
    ],
    transformIgnorePatterns: [
        '/node_modules/(?!ts-jest)',
    ],
    coverageThreshold: {
        global: {
            statements: 0,
            branches: 0,
            lines: 0,
            functions: 0,
        },
    },
    /*
    transform: {
      // '^.+\\.tsx?$': 'babel-jest',
     '^.+\\.(ts|tsx)$': 'ts-jest', 
    },
    */
    "transform": {
        "\\.js$": "<rootDir>/node_modules/babel-jest",
        "\\.jsx$": "<rootDir>/node_modules/babel-jest"
    },
};
