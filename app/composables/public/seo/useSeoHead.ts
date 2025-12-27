// app/composables/public/seo/useSeoHead.ts
import type { SeoMeta } from './types'
import { unref } from 'vue'

export const useSeoHead = (input: SeoMeta | Ref<SeoMeta>) => {
  useHead(() => {
    const seo = unref(input)

    const meta = []

    // Basic
    if (seo.description) {
      meta.push({
        name: 'description',
        content: seo.description,
      })
    }

    if (seo.robots) {
      meta.push({
        name: 'robots',
        content: seo.robots,
      })
    }

    // Open Graph
    meta.push({
      property: 'og:title',
      content: seo.title,
    })

    if (seo.description) {
      meta.push({
        property: 'og:description',
        content: seo.description,
      })
    }

    if (seo.image) {
      meta.push({
        property: 'og:image',
        content: seo.image,
      })
    }

    // Twitter
    if (seo.twitter?.card) {
      meta.push({
        name: 'twitter:card',
        content: seo.twitter.card,
      })
    }

    if (seo.twitter?.site) {
      meta.push({
        name: 'twitter:site',
        content: seo.twitter.site,
      })
    }

    if (seo.twitter?.creator) {
      meta.push({
        name: 'twitter:creator',
        content: seo.twitter.creator,
      })
    }

    meta.push({
      name: 'twitter:title',
      content: seo.title,
    })

    if (seo.description) {
      meta.push({
        name: 'twitter:description',
        content: seo.description,
      })
    }

    if (seo.image) {
      meta.push({
        name: 'twitter:image',
        content: seo.image,
      })
    }

    return {
      title: seo.title,
      link: seo.canonical
        ? [{ rel: 'canonical', href: seo.canonical }]
        : [],
      meta,
    }
  })
}
