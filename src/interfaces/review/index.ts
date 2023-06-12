import { UserInterface } from 'interfaces/user';
import { RecipeInterface } from 'interfaces/recipe';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  comment: string;
  rating: number;
  user_id: string;
  recipe_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  recipe?: RecipeInterface;
  _count?: {};
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  comment?: string;
  user_id?: string;
  recipe_id?: string;
}
