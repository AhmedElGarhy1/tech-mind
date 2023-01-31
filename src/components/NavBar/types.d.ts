// types andd interfaces
export interface LinkType {
  id: number;
  name: {
    EN: string;
    AR: string;
  };
  href: string;
}
export type ClickMouseEventType = React.MouseEvent<
  HTMLAnchorElement,
  MouseEvent
>;

export interface NavLinksParamsType {
  menuIconRef: React.MutableRefObject<HTMLButtonElement>;
}
