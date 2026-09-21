export function normalizeSearchText(value:string):string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ");
}
export const normalize=normalizeSearchText;
export function tokenize(value:string):string[]{return normalizeSearchText(value).split(/[-\s]+/).filter(Boolean);}