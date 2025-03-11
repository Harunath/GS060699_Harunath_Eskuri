import { ReactNode } from "react";
import { create } from "zustand";

export interface SKUType {
	""?: () => ReactNode;
	id: string;
	label: string;
	price: string;
	cost: string;
}

interface SKUStore {
	data: SKUType[];
	loading: boolean; // Loading state
	error: string | null; // Error message
	setData: (newData: SKUType[]) => void;
	fetchData: () => Promise<void>;
}

export const useSKUStore = create<SKUStore>((set) => ({
	data: [],
	loading: false, // Loading state
	error: null, // Error message
	setData: (newData) => set({ data: newData }),
	fetchData: async () => {
		set({ loading: true, error: null });
		try {
			const res = await fetch("http://localhost:5000/api/sku");
			const jsonData = await res.json();
			set({ data: jsonData });
			set({ loading: false, error: null });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Service error",
				loading: false,
			});
		}
	},
}));
