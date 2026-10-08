import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, type Category } from "@/data/catalogue";

export type DbProduct = {
  id: string;
  category_slug: string;
  subcategory: string;
  name: string;
  price: number;
  reseller: number | null;
  image_url: string | null;
  sort_order: number;
};

export const productsQueryKey = ["db-products"];

export async function fetchDbProducts(): Promise<DbProduct[]> {
  const { data, error } = await (supabase as any)
    .from("products")
    .select("id, category_slug, subcategory, name, price, reseller, image_url, sort_order")
    .order("sort_order", { ascending: true })
    .limit(5000);
  if (error) throw error;
  return (data ?? []).map((r: any) => ({ ...r, price: Number(r.price), reseller: r.reseller == null ? null : Number(r.reseller) }));
}

/** Builds categories from saved products; falls back to the built-in list when nothing is saved yet. */
export function buildCategories(rows: DbProduct[] | undefined): Category[] {
  if (!rows || rows.length === 0) return CATEGORIES;
  return CATEGORIES.map((c) => {
    const mine = rows.filter((r) => r.category_slug === c.slug);
    const names = [...new Set([...c.subcategories.map((s) => s.name), ...mine.map((r) => r.subcategory)])];
    return {
      ...c,
      subcategories: names
        .map((name) => ({
          name,
          products: mine
            .filter((r) => r.subcategory === name)
            .map((r) => ({ name: r.name, price: r.price, reseller: r.reseller ?? undefined, image: r.image_url ?? undefined })),
        }))
        .filter((s) => s.products.length > 0),
    };
  });
}

export function useLiveCategories(): Category[] {
  const { data } = useQuery({ queryKey: productsQueryKey, queryFn: fetchDbProducts, staleTime: 60_000, retry: 1 });
  return buildCategories(data);
}
