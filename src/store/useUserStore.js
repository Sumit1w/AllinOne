import { create } from 'zustand';

const useUserStore = create((set) => ({
  isOnboarded: false,
  profile: {
    age: null,
    gender: null,
    height: null,
    weight: null,
    goal: null, // 'Muscle Build', 'Fat Loss', etc.
    experience: null, // 'Beginner', 'Intermediate', 'Advanced'
  },
  
  setProfileField: (field, value) => 
    set((state) => ({
      profile: { ...state.profile, [field]: value }
    })),
    
  completeOnboarding: () => set({ isOnboarded: true }),
  resetStore: () => set({ 
    isOnboarded: false, 
    profile: { age: null, gender: null, height: null, weight: null, goal: null, experience: null } 
  }),
}));

export default useUserStore;
