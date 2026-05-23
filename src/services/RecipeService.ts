import api from "../lib/axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipe-schema";
import type { Drink, SearchFilter } from "../types";


export async function getCategories() {
    const url = "/list.php?c=list"
    const { data } = await api(url);
    const result = CategoriesAPIResponseSchema.safeParse(data);
    if (result.success) {
        return result.data;
    }
}

export async function getRecipes(searchFilter: SearchFilter) {
    const url = `/filter.php?i=${searchFilter.ingredient}&c=${searchFilter.category}`;
    const { data } = await api(url);
    const result = DrinksAPIResponse.safeParse(data);
    if (result.success) {
        return result.data;
    }
}

export async function getRecipeById(id: Drink['idDrink']) {
    const url = `/lookup.php?i=${id}`;
    const { data } = await api(url);
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
    if (result.success) {
        return result.data;
    }
}