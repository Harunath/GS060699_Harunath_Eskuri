import { ReactNode } from "react";
import { create } from "zustand";

export interface StoreType {
	""?: () => ReactNode;
	"S no": number | string;
	id: string; // Assuming each store has an ID
	label: string;
	city: string;
	state: string;
}

interface StoreState {
	data: StoreType[]; // Stores the fetched store data
	loading: boolean; // Loading state
	error: string | null; // Error message
	fetchData: () => Promise<void>; // Function to fetch data
	setData: (data: StoreType[]) => void; // Function to manually set data
}

export const useStoreStore = create<StoreState>((set) => ({
	data: [],
	loading: false,
	error: null,

	fetchData: async () => {
		set({ loading: true, error: null });

		try {
			const res = await fetch("http://localhost:5000/api/store");
			if (!res.ok) throw new Error("Failed to fetch store data");

			const jsonData: StoreType[] = await res.json();
			set({ data: jsonData, loading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Service error",
				loading: false,
			});
		}
	},

	setData: (data: StoreType[]) => set({ data }),
}));
