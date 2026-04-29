import type { Core } from '@strapi/strapi';

const PUBLIC_ARTICLE_ACTIONS = [
  'api::article.article.find',
  'api::article.article.findOne',
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' }, populate: { permissions: true } });

    if (!publicRole) return;

    const existing = new Set(
      (publicRole.permissions ?? []).map((p: { action: string }) => p.action),
    );

    for (const action of PUBLIC_ARTICLE_ACTIONS) {
      if (existing.has(action)) continue;
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
    }
  },
};
