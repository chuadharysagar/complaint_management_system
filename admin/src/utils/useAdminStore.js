import { create } from 'zustand'

export const useAdminStore = create((set) => ({
  selectedCategory:"All",
  currentStatus :"",
  setSelectedCategory:(newCategory)=>set({selectedCategory:newCategory}),
  setCurrentStatus:(newStatus)=>set({setCurrentStatus:newStatus}),
}))
