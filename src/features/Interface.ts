import { IconType } from "react-icons";

export interface navItem {
  label: string;
  icon: IconType;
  path: string;
}

export interface device {
  id: string;
  macAddress: string;
  positions: position[];
  type: string;
}

export interface position {
  id: string;
  macAddress: string;
  timestamp: string;
  type: string;
  x: number;
  y: number;
}

export interface simplePosition {
  x: number;
  y: number;
}
