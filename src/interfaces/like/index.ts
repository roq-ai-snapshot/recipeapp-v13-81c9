import { UserInterface } from 'interfaces/user';
import { RecipeInterface } from 'interfaces/recipe';
import { GetQueryInterface } from 'interfaces';

export interface LikeInterface {
  id?: string;
  user_id: string;
  recipe_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  recipe?: RecipeInterface;
  _count?: {};
}

export interface LikeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  recipe_id?: string;
}
