import { m } from '@/paraglide/messages'
import type { CaseStudy } from './types'

export const cases: CaseStudy[] = [
  {
    id: 'optimus',
    title: m.case_optimus_title,
    meta: m.case_optimus_meta,
    intro: m.case_optimus_intro,
    stack: ['Next.js', 'NestJS', 'AWS ECS', 'AWS Lambda', 'DynamoDB', 'S3', 'VTEX'],
    parts: [
      {
        id: 'optimus',
        text: m.case_optimus_work,
        steps: [
          { label: m.case_optimus_step_app, tech: 'Next.js' },
          { label: m.case_optimus_step_api, tech: 'NestJS, ECS' },
          { label: m.case_optimus_step_services, tech: 'Lambda, DynamoDB, S3' },
          { label: m.case_optimus_step_store, tech: 'VTEX' },
        ],
      },
    ],
  },
  {
    id: 'apis',
    title: m.case_apis_title,
    meta: m.case_apis_meta,
    intro: m.case_apis_intro,
    stack: ['Python', 'React', 'Node.js', 'CI/CD', 'UI5', 'SAP API Management'],
    parts: [
      {
        id: 'gerdau',
        heading: 'Gerdau',
        text: m.case_apis_gerdau_text,
        steps: [
          { label: m.case_apis_step_card, tech: 'Jira' },
          { label: m.case_apis_step_automation, tech: 'Python' },
          { label: m.case_apis_step_published, tech: 'SAP API Management' },
        ],
      },
      {
        id: 'rhi',
        heading: 'RHI Magnesita',
        text: m.case_apis_rhi_text,
        steps: [
          { label: m.case_apis_step_request, tech: 'React' },
          { label: m.case_apis_step_approval, tech: 'Node.js' },
          { label: m.case_apis_step_published, tech: 'SAP API Management' },
        ],
      },
      {
        id: 'bunge',
        heading: 'Bunge',
        text: m.case_apis_bunge_text,
        steps: [
          { label: m.case_apis_step_payload },
          { label: m.case_apis_step_pipeline, tech: 'CI/CD' },
          { label: m.case_apis_step_published, tech: 'SAP API Management' },
          { label: m.case_apis_step_metrics, tech: 'UI5' },
        ],
      },
    ],
  },
  {
    id: 'braskem',
    title: m.case_braskem_title,
    meta: m.case_braskem_meta,
    intro: m.case_braskem_intro,
    stack: ['UI5', 'CAP', 'SAP DMS', 'SAP BTP Role Collections'],
    parts: [
      {
        id: 'braskem',
        text: m.case_braskem_work,
        steps: [
          { label: m.case_braskem_step_legacy, tech: 'Fiori Launchpad, Web Dynpro Java' },
          { label: m.case_braskem_step_btp, tech: 'UI5, CAP' },
          { label: m.case_braskem_step_services, tech: 'SAP DMS, Role Collections' },
        ],
      },
    ],
  },
  {
    id: 'advisor',
    title: m.case_advisor_title,
    meta: m.case_advisor_meta,
    intro: m.case_advisor_intro,
    stack: ['UI5', 'Python', 'OpenAI API'],
    parts: [
      {
        id: 'advisor',
        text: m.case_advisor_work,
        steps: [
          { label: m.case_advisor_step_form, tech: 'UI5' },
          { label: m.case_advisor_step_backend, tech: 'Python' },
          { label: m.case_advisor_step_model, tech: 'GPT' },
          { label: m.case_advisor_step_answer },
        ],
      },
    ],
  },
]
