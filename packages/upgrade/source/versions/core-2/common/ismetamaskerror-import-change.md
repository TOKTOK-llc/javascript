---
title: '`isMetamaskError` import moved under `/errors`'
matcher: "import\\s+{[\\s\\S]*?isMetamaskError[\\s\\S]*?from\\s+['\"]@clerk\\/(react)[\\s\\S]*?['\"]"
matcherFlags: 'm'
category: 'error-imports'
replaceWithString: 'react/errors'
---

The `isMetamaskError` import path has changed from `@clerk/react` to `@clerk/react/errors`. You must update your import path in order for it to work correctly. Example below of the fix that needs to be made:

```diff
- import { isMetamaskError } from "@clerk/react"
+ import { isMetamaskError } from "@clerk/react/errors"
```