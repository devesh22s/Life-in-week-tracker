import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { differenceInWeeks } from 'date-fns';

export const useLifeStore = create(
  persist(
    (set, get) => ({
      birthDate: null,
      name: '',
      events: [], // { weekId: 100, title: "Graduated", type: "milestone" }
      theme: 'cyber', // cyber, minimal, paper

      setProfile: (name, date) => set({ name, birthDate: date }),
      
      addEvent: (weekId, title, type = 'memory') => set((state) => ({
        events: [...state.events, { id: Date.now(), weekId, title, type }]
      })),

      removeEvent: (id) => set((state) => ({
        events: state.events.filter(e => e.id !== id)
      })),

      // Helper to calculate lived weeks
      getLivedWeeks: () => {
        const { birthDate } = get();
        if (!birthDate) return 0;
        return differenceInWeeks(new Date(), new Date(birthDate));
      }
    }),
    {
      name: 'life-os-storage', // unique name in localStorage
    }
  )
);