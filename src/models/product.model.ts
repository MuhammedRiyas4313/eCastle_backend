import { Schema, Types, model } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    category: String,
    image: String,
  },
  { timestamps: true },
);

productSchema.index({ title: 1 });
productSchema.index({ category: 1 });

export const Product = model<IProduct>("products", productSchema);
