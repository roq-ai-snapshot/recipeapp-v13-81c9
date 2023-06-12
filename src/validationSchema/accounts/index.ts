import * as yup from 'yup';
import { recipeValidationSchema } from 'validationSchema/recipes';

export const accountValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  recipe: yup.array().of(recipeValidationSchema),
});
