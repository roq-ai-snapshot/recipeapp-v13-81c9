import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { recipeValidationSchema } from 'validationSchema/recipes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.recipe
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRecipeById();
    case 'PUT':
      return updateRecipeById();
    case 'DELETE':
      return deleteRecipeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRecipeById() {
    const data = await prisma.recipe.findFirst(convertQueryToPrismaUtil(req.query, 'recipe'));
    return res.status(200).json(data);
  }

  async function updateRecipeById() {
    await recipeValidationSchema.validate(req.body);
    const data = await prisma.recipe.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRecipeById() {
    const data = await prisma.recipe.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
