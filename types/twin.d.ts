import 'twin.macro';
import styledImport from '@emotion/styled';
import { css as cssImport } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';

declare module 'twin.macro' {
  const css: typeof cssImport;
  const styled: typeof styledImport;
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}
