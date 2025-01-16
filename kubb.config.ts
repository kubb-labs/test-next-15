import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  input: {
    path: 'https://petstore.swagger.io/v2/swagger.json',
  },
  root: '.',
  name: '@ssil/generated',
  output: {
    path: './src/gen',
    write: true,
    clean: true,
    extension: undefined,
    barrelType: 'named',
  },
  hooks: {},
  plugins: [
    pluginOas({ validate: true }),
    pluginTs({
      unknownType: 'unknown',
      enumSuffix: '',
      transformers: {
        name: (name) => `${name}Type`,
      },
    }),
    pluginClient({
      importPath: '@ssil/client/socio',
      pathParamsType: 'object',
    }),
    pluginReactQuery({
      client: {
        dataReturnType: 'data',
        importPath: '@ssil/client/socio',
      },
      suspense: {},
    }),
    pluginZod({
      unknownType: 'unknown',
      coercion: true,
      typed: true,
    }),
  ],
})
