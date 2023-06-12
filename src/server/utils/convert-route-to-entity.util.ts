const mapping: Record<string, string> = {
  accounts: 'account',
  likes: 'like',
  recipes: 'recipe',
  reviews: 'review',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
