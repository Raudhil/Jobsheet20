import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/pages/about/index.tsx',
    'src/pages/produk/index.tsx',
    'src/components/layouts/footer/index.tsx',
    'src/components/layouts/AppShell/index.tsx',
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
}

export default createJestConfig(config)
