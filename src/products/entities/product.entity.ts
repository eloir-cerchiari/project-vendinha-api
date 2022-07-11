import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Types} from "mongoose";

export type ProductDocument = Product & Document;


@Schema()
export class Product extends mongoose.Document{
	
	@Prop()
	name: string;

	@Prop()
	gtin: string;

	@Prop()
	size: string;

	@Prop()
	color: string;
}

export const ProductSchema  = SchemaFactory.createForClass(Product);