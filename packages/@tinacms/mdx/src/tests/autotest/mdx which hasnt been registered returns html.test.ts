/**

Copyright 2021 Forestry.io Holdings, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
import { describe, it, expect } from 'vitest'
import { field, output, parseMDX, stringifyMDX } from './_config'
import markdownString from './mdx which hasnt been registered returns html.md?raw'

const out = output({
  type: 'root',
  children: [
    {
      type: 'html',
      value: '<SomeUnregisteredComponen hello="world" />',
      children: [{ type: 'text', text: '' }],
    },
    {
      type: 'html',
      value:
        '<SomeUnregisteredComponen>\n  # Some markdown in the child\n</SomeUnregisteredComponen>',
      children: [{ type: 'text', text: '' }],
    },
  ],
})

describe('./mdx which hasnt been registered returns html.md', () => {
  it('parses the string in the expected AST', () => {
    expect(parseMDX(markdownString, field, (v) => v)).toMatchObject(out)
  })
  it('stringifies the AST into the expect string', () => {
    expect(stringifyMDX(out, field, (v) => v)).toEqual(markdownString)
  })
})
