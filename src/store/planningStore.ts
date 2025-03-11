import { create } from "zustand";
const api = "http://localhost:5000/api";

interface WeekData {
	weekNO: number;
	salesUnits: number;
	salesDollars: number;
	costDollars: number;
	gmDollars: number;
	gmPercent: number;
}

interface MonthData {
	monthName: string;
	weeks: WeekData[];
}

interface SKUType {
	SKU: string;
	name: string;
}

interface StoreType {
	Store: string;
	name: string;
}

export interface PlanningData {
	Store: StoreType;
	SKU: SKUType;
	months: MonthData[];
}

interface PlanningStore {
	data: PlanningData[]; // State for storing planning data
	loading: boolean; // Loading state
	error: string | null; // Error state
	selectedStore: string;
	setSelectedStore: (store: string) => void;
	fetchData: () => Promise<void>; // Fetch function
	fetchStoreData: (store: string) => Promise<void>;
	setData: (data: PlanningData[]) => void; // Set data manually
}

export const usePlanningStore = create<PlanningStore>((set) => ({
	data: [],
	loading: false,
	error: null,
	selectedStore: "ST035",
	setSelectedStore: (store: string) => set({ selectedStore: store }),
	fetchStoreData: async (store: string) => {
		set({ loading: true, error: null });
		try {
			const res = await fetch(`${api}/planning/store`, {
				method: "POST",
				body: JSON.stringify({ store }),
				headers: { "Content-Type": "application/json" },
			});
			if (!res.ok) throw new Error("Failed to fetch planning data");
			const data: PlanningData[] = await res.json();
			set({ data, loading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Service error",
				loading: false,
			});
		}
	},
	fetchData: async () => {
		set({ loading: true, error: null });
		try {
			const res = await fetch(`${api}/planning/store`);
			if (!res.ok) throw new Error("Failed to fetch planning data");
			const data: PlanningData[] = await res.json();
			set({ data, loading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Service error",
				loading: false,
			});
		}
	},
	setData: (data: PlanningData[]) => set({ data }),
}));
