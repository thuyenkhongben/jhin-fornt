import {Picture} from './interface/Picture';
import {Category} from '../category/category';

export interface ProductFake {
  data?: any;
  productId: string;
  nameProduct: string;
  priceProduct: number;
  amount: number;
  descriptionProduct: string;
  pictures?: Picture[];
  category: Category;
  statusProduct: boolean;
}
