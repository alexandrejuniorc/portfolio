import { m } from '@/paraglide/messages'
import type { StackSide } from './types'

export const stackSides: StackSide[] = [
  {
    id: 'sap',
    title: m.stack_sap_title,
    items: [
      'SAP Fiori and UI5',
      'CAP',
      'SAP Integration Suite',
      'SAP API Management',
      'SAP Build Apps',
      'SAP HANA',
      'SAP DMS',
      'GenAI',
    ],
  },
  {
    id: 'web',
    title: m.stack_web_title,
    items: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'NestJS',
      'Python',
      'AWS Lambda',
      'AWS ECS',
      'DynamoDB',
      'API Gateway',
      'S3',
      'Terraform',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'CI/CD',
    ],
  },
]
