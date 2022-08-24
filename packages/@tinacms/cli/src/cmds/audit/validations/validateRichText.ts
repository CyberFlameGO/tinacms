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

import { AuditIssue, AuditWarning } from '../issue'

const validateValues = (values, addWarning: (message: string) => void) => {
  let fields = Object.keys(values)
    .map((fieldName) => values[fieldName])
    .filter((field) => typeof field === 'object')

  fields
    .filter((field) => field?.type == 'root')
    .forEach((field) => {
      const errorMessages = field.children
        .filter((f) => f.type == 'invalid_markdown')
        .map((f) => f.message)

      errorMessages.forEach((errorMessage) => {
        addWarning(errorMessage)
      })
    })

  //check nested values
  fields.forEach((field) => {
    if (field) {
      validateValues(field, addWarning)
    }
  })
}

export const validateRichText = (node) => {
  let issues: AuditIssue[] = []

  validateValues(node._values, (message) =>
    issues.push(new AuditWarning(message, node._sys.path))
  )
  return issues
}
