import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  in: () => import('./dictionaries/in.json').then((module) => module.default),
  sp: () => import('./dictionaries/sp.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => dictionaries[locale]()