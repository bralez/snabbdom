declare namespace snabbdom {

  interface VNodeData {
    // modules - use any because Object type is useless
    props?: any;
    attrs?: any;
    class?: any;
    style?: any;
    dataset?: any;
    on?: any;
    hero?: any;
    // end of modules
    hook?: Hooks;
    key?: string | number;
    ns?: string; // for SVGs
    fn?: () => VNode; // for thunks
    args?: Array<any>; // for thunks
  }

  interface VNode {
    sel: string;
    data?: VNodeData;
    children?: Array<VNode | string>;
    elm?: Element | Text;
    text?: string;
    key?: string | number;
  }

  interface ThunkData extends VNodeData {
    fn: () => VNode;
    args: Array<any>;
  }

  interface Thunk extends VNode {
    data: ThunkData;
  }

  type PreHook = () => any;
  type InitHook = (vNode: VNode) => any;
  type CreateHook = (emptyVNode: VNode, vNode: VNode) => any;
  type InsertHook = (vNode: VNode) => any;
  type PrePatchHook = (oldVNode: VNode, vNode: VNode) => any;
  type UpdateHook = (oldVNode: VNode, vNode: VNode) => any;
  type PostPatchHook = (oldVNode: VNode, vNode: VNode) => any;
  type DestroyHook = (vNode: VNode) => any;
  type RemoveHook = (vNode: VNode, removeCallback: () => void) => any;
  type PostHook = () => any;

  interface Hooks {
    pre?: PreHook;
    init?: InitHook;
    create?: CreateHook;
    insert?: InsertHook;
    prepatch?: PrePatchHook;
    update?: UpdateHook;
    postpatch?: PostPatchHook;
    destroy?: DestroyHook;
    remove?: RemoveHook;
    post?: PostHook;
  }

  interface Module {
    pre?: PreHook;
    create?: CreateHook;
    update?: UpdateHook;
    destroy?: DestroyHook;
    remove?: RemoveHook;
    post?: PostHook;
  }

  interface SnabbdomAPI<T> {
    createElement(tagName: string): T;
    createElementNS(namespaceURI: string, qualifiedName: string): T;
    createTextNode(text: string): T;
    insertBefore(parentNode: T, newNode: T, referenceNode: T): void;
    removeChild(node: T, child: T): void;
    appendChild(node: T, child: T): void;
    parentNode(node: T): T;
    nextSibling(node: T): T;
    tagName(node: T): string;
    setTextContent(node: T, text: string): void;
  }

  interface PatchFunction {
    (oldVNode: VNode | Element, vnode: VNode): VNode;
  }

  function init(modules: Object, api?: SnabbdomAPI<any>): PatchFunction;

  function thunk(sel: string,
                key: string,
                render: (...state: Array<any>) => VNode,
                ...state: Array<any>): Thunk;

  function array(x: any): boolean;
  function primitive(x: any): boolean;

  function h(tagName: string, properties: VNodeData, children: string | Array<VNode | string>): VNode;
  function h(tagName: string, children: string | Array<VNode | string>): VNode;
}

declare module "snabbdom" {
  export = snabbdom;
}

declare module "snabbdom/h" {
  import h = snabbdom.h;
  export = h;
}

declare module "snabbdom/vnode" {
  import VNode = snabbdom.VNode;
  export = VNode;
}

declare module "snabbdom/is" {
   import array = snabbdom.array;
   import primitive = snabbdom.primitive;
   export = { array, primitive };
}

declare module "snabbdom/thunk" {
    import thunk = snabbdom.thunk;
    export = thunk;
}

declare module "snabbdom/htmldomapi" {
  let api: snabbdom.SnabbdomAPI<Element>;
  export = api;
}

declare module "snabbdom/modules/class" {
  let ClassModule: snabbdom.Module;
  export = ClassModule;
}

declare module "snabbdom/modules/props" {
  let PropsModule: snabbdom.Module;
  export = PropsModule;
}

declare module "snabbdom/modules/attributes" {
  let AttrsModule: snabbdom.Module;
  export = AttrsModule;
}

declare module "snabbdom/modules/eventlisteners" {
  let EventsModule: snabbdom.Module;
  export = EventsModule;
}

declare module "snabbdom/modules/hero" {
  let HeroModule: snabbdom.Module;
  export = HeroModule;
}

declare module "snabbdom/modules/style" {
  let StyleModule: snabbdom.Module;
  export = StyleModule;
}

declare module "snabbdom/modules/dataset" {
  let DatasetModule: snabbdom.Module;
  export = DatasetModule;
}
