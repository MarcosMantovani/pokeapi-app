/// <reference types="react-scripts" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module "react-whatsmarked" {
  import { ComponentType } from "react";
  const WhatsMarked: ComponentType<{ children: string }>;
  export default WhatsMarked;
}
