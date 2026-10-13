import { describe, expect, test } from 'vitest'
import { proofs } from '@/content/proof'
import { renderIn } from '@/test/render'
import { About } from './about/About'
import { Clients } from './clients/Clients'
import { Contact } from './contact/Contact'
import { Footer } from './footer/Footer'
import { Hero } from './hero/Hero'
import { Proof } from './proof/Proof'
import { Stack } from './stack/Stack'
import { Work } from './work/Work'

const count = (html: string, needle: string) => html.split(needle).length - 1

describe('Hero', () => {
  test('says who he is and what he does, in one h1 of two lines', () => {
    const html = renderIn('en', <Hero />)
    expect(count(html, '<h1')).toBe(1)
    expect(html).toContain('Software that connects')
    expect(html).toContain('SAP to everything else.')
    expect(html).toContain('I am Alexandre Junior, a full-stack engineer in São Paulo')
  })

  test('offers the CV of the page language as the one primary action', () => {
    const en = renderIn('en', <Hero />)
    expect(count(en, 'class="arrow-button"')).toBe(1)
    expect(en).toContain('href="/cv/CV_Alexandre_Junior_EN.pdf"')
    const pt = renderIn('pt', <Hero />)
    expect(pt).toContain('href="/cv/CV_Alexandre_Junior_BR.pdf"')
    expect(pt).toContain('Baixar CV')
  })

  test('shows the three figures as arrows', () => {
    const html = renderIn('en', <Hero />)
    expect(count(html, 'class="flow-step"')).toBe(3)
    for (const figure of ['>5+<', '>8<', '>1M+<']) expect(html).toContain(figure)
    expect(html).toContain('enterprise clients, from Whirlpool to Braskem')
  })
})

describe('Work', () => {
  test('is the section the navigation points to', () => {
    const html = renderIn('en', <Work />)
    expect(html).toMatch(/^<section id="work"/)
    expect(count(html, '<h2')).toBe(1)
  })

  test('tells four cases, each an article named by its own heading', () => {
    const html = renderIn('en', <Work />)
    expect(count(html, '<article')).toBe(4)
    for (const id of ['optimus', 'apis', 'braskem', 'advisor']) {
      expect(html).toContain(`aria-labelledby="case-${id}"`)
      expect(html).toContain(`id="case-${id}"`)
    }
    expect(html).toContain('Optimus Pricing')
    expect(html).toContain('Whirlpool, 2025')
  })

  test('draws six flows, three of them for the three generations of the API case', () => {
    const html = renderIn('en', <Work />)
    expect(count(html, 'class="flow flow-case"')).toBe(6)
    for (const client of ['Gerdau', 'RHI Magnesita', 'Bunge']) {
      expect(html).toContain(`<h4 class="t-lead font-display font-bold">${client}</h4>`)
    }
  })

  test('names the whole stack of a case, not only the SAP side', () => {
    const html = renderIn('en', <Work />)
    expect(html).toContain('Next.js, NestJS, AWS ECS, AWS Lambda, DynamoDB, S3, VTEX')
    expect(html).toContain('Python, React, Node.js, CI/CD, UI5, SAP API Management')
  })

  test('is translated', () => {
    const html = renderIn('es', <Work />)
    expect(html).toContain('Un problema, resuelto tres veces')
    expect(html).toContain('Hecho con')
    expect(html).toContain('Cola de aprobación')
  })
})

describe('Stack', () => {
  test('gives SAP and the web the same weight: two blocks of one flow', () => {
    const html = renderIn('en', <Stack />)
    expect(html).toMatch(/^<section id="stack"/)
    expect(count(html, 'class="flow-step"')).toBe(2)
    expect(html).toContain('<h3 class="t-heading">SAP BTP</h3>')
    expect(html).toContain('<h3 class="t-heading">Web and cloud</h3>')
  })

  test('lists the technologies on each side', () => {
    const html = renderIn('pt', <Stack />)
    for (const name of ['SAP API Management', 'CAP', 'Next.js', 'NestJS', 'Terraform', 'Python']) {
      expect(html).toContain(`>${name}</li>`)
    }
    expect(html).toContain('Web e cloud')
  })
})

describe('Clients', () => {
  test('is a real table with one row per client', () => {
    const html = renderIn('en', <Clients />)
    expect(html).toMatch(/^<section id="clients"/)
    expect(count(html, '<table')).toBe(1)
    expect(count(html, 'scope="row"')).toBe(8)
    expect(count(html, 'scope="col"')).toBe(2)
  })

  test('says what he did at each client, in the page language', () => {
    const html = renderIn('pt', <Clients />)
    expect(html).toContain('>Braskem</th>')
    expect(html).toContain(
      'Migração dos apps do Launchpad do ECC para o SAP BTP com UI5, CAP e DMS.',
    )
    expect(html).toContain('Melhorias em um app feito em SAP Build Apps.')
  })
})

describe('Proof', () => {
  test('lists three certifications and the award, with issuer and year', () => {
    const html = renderIn('en', <Proof />)
    expect(html).toMatch(/^<section id="proof"/)
    expect(count(html, '<li')).toBe(4)
    expect(html).toContain('SAP Fiori Application Developer')
    expect(html).toContain('SAP, 2026')
    expect(html).toContain('Hack2Build, 1st runner-up')
    expect(html).toContain('SAP, 2024')
  })

  test('links a credential only where the content has an address for it', () => {
    const linked = proofs.filter((proof) => proof.href).length
    expect(count(renderIn('en', <Proof />), 'View credential')).toBe(linked)
  })
})

describe('About', () => {
  test('tells the short biography and the facts beside it', () => {
    const html = renderIn('en', <About />)
    expect(html).toMatch(/^<section id="about"/)
    expect(html).toContain('I started in 2021')
    expect(count(html, '<dt')).toBe(3)
    expect(html).toContain('BSc in Software Engineering, Estácio, 2024 to 2028 (in progress)')
    expect(html).toContain('English, B2')
    expect(html).toContain('São Paulo, Brazil (UTC−3)')
  })

  test('does not claim Spanish as a spoken language', () => {
    expect(renderIn('es', <About />)).not.toMatch(/Español, |Spanish/)
  })
})

describe('Contact', () => {
  test('puts the email address forward as a mailto link', () => {
    const html = renderIn('en', <Contact />)
    expect(html).toMatch(/^<section id="contact"/)
    expect(html).toContain('href="mailto:alejunior.dev@gmail.com"')
    expect(html).toContain('>alejunior.dev@gmail.com</a>')
  })

  test('links the CV of the page language and the two profiles', () => {
    const html = renderIn('pt', <Contact />)
    expect(html).toContain('href="/cv/CV_Alexandre_Junior_BR.pdf"')
    expect(html).toContain('href="https://www.linkedin.com/in/alexandrejuniorc/"')
    expect(html).toContain('href="https://github.com/alexandrejuniorc"')
  })

  test('before the script runs it only says where he works from', () => {
    const html = renderIn('en', <Contact />)
    expect(html).toContain('I work from São Paulo, UTC−3.')
    expect(html).not.toContain('hours-row')
    expect(html).not.toContain('working hours today')
  })

  test('never shows a phone number', () => {
    expect(renderIn('en', <Contact />)).not.toMatch(/\+55/)
  })
})

describe('Footer', () => {
  test('closes with the name and repeats the language and theme switches', () => {
    const html = renderIn('es', <Footer />)
    expect(html).toMatch(/^<footer/)
    expect(html).toContain('Alexandre Junior')
    expect(html).toContain('aria-label="Idioma"')
    expect(html).toContain('aria-label="Cambiar entre tema oscuro y claro"')
    expect(html).toContain('href="#main"')
    expect(html).toContain('Volver arriba')
  })
})
