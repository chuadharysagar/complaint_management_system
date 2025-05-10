import { create } from 'zustand'
import apiRequest from './apiRequest'

export const useAdminStore = create((set) => ({
  selectedCategory: "all",
  currentStatus: "",
  setSelectedCategory: (newCategory) => set({ selectedCategory: newCategory }),
  setCurrentStatus: (newStatus) => set({ currentStatus: newStatus }),

  stats:[],
  prevStats:[],
  fetchStats: async () => {
    try {
      const res = await apiRequest.get("/admin/stats", {
        withCredentials: true,
      });
      set({ stats: res.data.currentMonth});
      set({prevStats:res.data.lastMonth});
    } catch (error) {
      console.log("Error Fetching stats", error);
    }
  }
}));
