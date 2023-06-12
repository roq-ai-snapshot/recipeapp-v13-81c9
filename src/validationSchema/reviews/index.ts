import * as yup from 'yup';

export const reviewValidationSchema = yup.object().shape({
  comment: yup.string().required(),
  rating: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  recipe_id: yup.string().nullable().required(),
});
