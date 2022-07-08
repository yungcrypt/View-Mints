import { atom } from "recoil";
import { CandyMachineAccount } from "../../vendor_modules/cmui/candy-machine";

export type candyInfo = {
  startDate: number,
  price: number,
  remain: number
};
export const candyStateAtom = atom<candyInfo>({
  key: "candyState",
  default:{ 
    startDate: 0,
    price: 0,
    remain: 0,
  }
});

