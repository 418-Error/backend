import { ArchitectConfig } from '@ioc:Adonis/Core/Architect'

const architectConfig: ArchitectConfig = {
  domains: ['users', 'questions'],
  applications: {
    authentication: {
      prefix: 'authentication',
      as: 'authentication',
    },
    security: {
      prefix: '',
      as: 'security',
    },
    storage: {
      prefix: 'storage',
      as: 'storage'
    },
    questions: {
      prefix: '',
      as: 'questions'
    }
  },
}

export default architectConfig
