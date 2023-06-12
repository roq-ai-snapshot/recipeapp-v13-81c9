import * as yup from 'yup';
import { likeValidationSchema } from 'validationSchema/likes';
import { reviewValidationSchema } from 'validationSchema/reviews';

export const recipeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  difficulty_level: yup.number().integer().required(),
  image: yup.string(),
  account_id: yup.string().nullable().required(),
  like: yup.array().of(likeValidationSchema),
  review: yup.array().of(reviewValidationSchema),
});
