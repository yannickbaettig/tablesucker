"use server";

import { SeasonFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Season } from "@/types/types";

type SeasonFormInputs = z.infer<typeof SeasonFormSchema>;
type InsertSeason = Omit<Season, "id" | "created_at">;

export async function createSeason(inputData: SeasonFormInputs) {
  const supabase = createClient(cookies());
  const parsed = SeasonFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  console.log(inputData);

  const seasonsRows: InsertSeason[] = [
    {
      start_date: parsed.data.start_date.toISOString(), // Convert Date to string
      end_date: parsed.data.end_date?.toISOString() ?? null,
    },
  ];
  try {
    const { data: seasonData, error: seasonError } = await supabase
      .from("seasons")
      .insert(seasonsRows)
      .select()
      .single();
    if (seasonError) return { data: null, error: seasonError };

    revalidatePath("/seasons");
    return { data: seasonData, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getSeasons( activeOnly: boolean = false) {
  const supabase = createClient(cookies());
  const query = supabase.from("seasons").select("*");

  if (activeOnly) {
    const today = new Date().toISOString();
    query.or(`end_date.is.null,end_date.gte.${today}`);
  }

  query.order("start_date", { ascending: false });
  const { data, error } = await query;
  return { data, error };
}

export async function getSeasonById(id: number) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("seasons")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}
