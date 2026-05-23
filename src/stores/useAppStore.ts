import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice, type RecipesSliceType } from './recipeSlice';
import { createFavoriteSlice, type FavoriteSliceType } from './favoriteSlice';
import { createNotificationSlice,  type NotificationSliceType } from './notificationSlice';


export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})));