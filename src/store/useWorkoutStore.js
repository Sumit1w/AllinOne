import { create } from 'zustand';

const useWorkoutStore = create((set) => ({
  customPlans: [],
  addCustomPlan: (planName, exercises) => 
    set((state) => ({
      customPlans: [...state.customPlans, { id: Date.now().toString(), name: planName, exercises }]
    })),
  deleteCustomPlan: (planId) => 
    set((state) => ({
      customPlans: state.customPlans.filter(plan => plan.id !== planId)
    }))
}));

export default useWorkoutStore;
