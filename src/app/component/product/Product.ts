import {Picture} from './interface/Picture';
import {Category} from '../category/category';

export interface Product {
  productId?: string;
  nameProduct: string;
  priceProduct: number;
  amount: number;
  descriptionProduct: string;
  pictures: Picture[];
  category: Category;
  statusProduct: boolean;
}
