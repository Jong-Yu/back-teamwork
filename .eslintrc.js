module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off', // I로 시작하는 인터페이스 이름 사용 금지 (IUser) Off
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 (void) Off
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 모듈의 반환 타입 명시 (void) Off
    '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 금지
  },
};
