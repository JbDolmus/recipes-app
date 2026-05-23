import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice, type RecipesSliceType } from './recipeSlice';
import { createFavoriteSlice, type FavoriteSliceType } from './favoriteSlice';
import { createNotificationSlice,  type NotificationSliceType } from './notificationSlice';
import { createAISlice, type AISliceType } from './aiSlice';


export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType & AISliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})));