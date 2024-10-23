import { atom } from "recoil";

const chatAtom = atom({
  key: "chatAtom",
  default: JSON.parse(localStorage.getItem('hackit-convo'))
});

export default chatAtom;