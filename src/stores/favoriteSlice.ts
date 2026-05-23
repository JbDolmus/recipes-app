import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

export type FavoriteSliceType = {
    favorites: Recipe[];
    handleClickFavorite: (recipe: Recipe) => void;
    favoriteExists: (id: Recipe['idDrink']) => boolean;
    loadFromLocalStorage: () => void;
}

export const createFavoriteSlice: StateCreator<FavoriteSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {

        const { favorites, favoriteExists } = get();

        if (favoriteExists(recipe.idDrink)) {
            set({
                favorites: favorites.filter(fav => fav.idDrink !== recipe.idDrink)
            });
            createNotificationSlice(set, get, api).showNotification({
                text: 'Receta eliminada de favoritos',
                error: false,
            });
        } else {
            set({
                favorites: [...favorites, recipe]
            });
            createNotificationSlice(set, get, api).showNotification({
                text: 'Receta agregada a favoritos',
                error: false,
            });
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },
    favoriteExists: (id) => {
        return get().favorites.some(fav => fav.idDrink === id);
    },
    loadFromLocalStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            set({ favorites: JSON.parse(storedFavorites) });
        }
    }
})