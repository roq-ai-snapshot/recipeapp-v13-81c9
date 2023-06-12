import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { recipeValidationSchema } from 'validationSchema/recipes';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getRecipes();
    case 'POST':
      return createRecipe();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRecipes() {
    const data = await prisma.recipe
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'recipe'));
    return res.status(200).json(data);
  }

  async function createRecipe() {
    await recipeValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.like?.length > 0) {
      const create_like = body.like;
      body.like = {
        create: create_like,
      };
    } else {
      delete body.like;
    }
    if (body?.review?.length > 0) {
      const create_review = body.review;
      body.review = {
        create: create_review,
      };
    } else {
      delete body.review;
    }
    const data = await prisma.recipe.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
