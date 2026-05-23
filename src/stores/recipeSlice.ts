import type { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService";
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";

export type RecipesSliceType = {
    categories: Categories;
    drinks: Drinks;
    selectedRecipe: Recipe;
    modal: boolean;
    fetchCategories: () => Promise<void>;
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>;
    selectRecipe: (id: Drink['idDrink']) => Promise<void>;
    closeModal: () => void;
}

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories();
        if (categories) {
            set({ categories });
        }
    },
    searchRecipes: async (searchFilter) => {
        const drinks = await getRecipes(searchFilter);
        if (drinks) {
            set({ drinks });
        }
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id);
        if (selectedRecipe) {
            set({
                selectedRecipe,
                modal: true
            });
        }
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        });
    }
})