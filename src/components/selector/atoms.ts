import { atom } from "recoil";
export type MetaResult = {
  image: string;
  animation: string;
  description: string;
  name: string;
  attributes: any[];
};
export const selectedAtom = atom<MetaResult>({
  key: "selected",
  default: {
    image: "",
    animation: "",
    description: "",
    name: "",
    attributes: [""],
  },
});
export const mintedAtom = atom<boolean>({
  key: "minted",
  default: false,
});
export const hasAtom = atom<boolean>({
  key: "hasMinted",
  default: false,
});
export const openAtom = atom<boolean>({
  key: "isOpen",
  default: false,
});
