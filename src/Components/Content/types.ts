import { IItem } from "../../utility/types";

export interface ICategorySection {
  category: { id: string; name: string; categoryItems: IItem[] };
}
