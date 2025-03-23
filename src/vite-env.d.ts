// khai báo module cho các tệp SVG
declare module '*.svg' {
    import * as React from 'react';

    const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;

    export default ReactComponent;
}
declare module '*.png' {
    const value: string;
    export default value;
}
declare module '*.mp4' {
    const src: string;
    export default src;
}

declare module 'eruda';
/// <reference types="vite/client" />
