import type { LuliaConfig } from './types'
import { withValidation, validateConfig, validationRules } from './config'

export default withValidation(
  (initialConfig: LuliaConfig) => ({
    getConfig: () => initialConfig
  }),
  config => validateConfig(config, validationRules)
)
