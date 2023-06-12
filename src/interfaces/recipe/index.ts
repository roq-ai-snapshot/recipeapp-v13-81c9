import { LikeInterface } from 'interfaces/like';
import { ReviewInterface } from 'interfaces/review';
import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface RecipeInterface {
  id?: string;
  name: string;
  difficulty_level: number;
  image?: string;
  account_id: string;
  created_at?: any;
  updated_at?: any;
  like?: LikeInterface[];
  review?: ReviewInterface[];
  account?: AccountInterface;
  _count?: {
    like?: number;
    review?: number;
  };
}

export interface RecipeGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  image?: string;
  account_id?: string;
}
