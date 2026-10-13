import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { Flow } from './Flow'

const items = [
  { key: 'a', content: 'One' },
  { key: 'b', content: 'Two' },
  { key: 'c', content: 'Three' },
]

test('is an ordered list, so the sequence still reads without styles or a screen', () => {
  const html = renderToStaticMarkup(<Flow variant="case" items={items} />)
  expect(html).toBe(
    '<ol class="flow flow-case"><li class="flow-step">One</li><li class="flow-step">Two</li><li class="flow-step">Three</li></ol>',
  )
})

test('can be an unordered, labelled list when the order means nothing', () => {
  const html = renderToStaticMarkup(
    <Flow variant="stack" as="ul" label="Stacks" items={items.slice(0, 2)} />,
  )
  expect(html).toMatch(/^<ul class="flow flow-stack" aria-label="Stacks">/)
  expect(html.match(/<li /g)).toHaveLength(2)
})
