import { getModel } from "utils/db/modelFactory";
import { Schema } from "mongoose";

export interface IMenu {
  _id?: string;
  name: {
    [lang: string]: string
  };
  href: string;
  private: boolean;
}

const MenuSchema = new Schema<IMenu>({
  name: {
    type: Map,
    of: String,
    required: true
  },
  href: {
    type: String,
    required: true,
    unique: true
  },
  private: {
    type: Boolean,
    required: false
  },
}, {
  timestamps: true,
});

export const MenuModel = getModel<IMenu>('Menu', MenuSchema, 'Menu');