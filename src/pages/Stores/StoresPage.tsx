import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import {
	ModuleRegistry,
	AllCommunityModule,
	themeAlpine,
} from "ag-grid-community";
import { ReactNode, useState } from "react";
import { Trash2 } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface storeType {
	""?: () => ReactNode;
	"S no": number | string;
	Store: string;
	City: string;
	State: string;
}

const DelIcon = () => {
	return <Trash2 className="h-full" />;
};

const StoresPage = () => {
	const [rowData, setRowData] = useState<storeType[]>([
		{
			"S no": 1,
			Store: "Abc",
			City: "Xyz",
			State: "GA",
		},
		{
			"S no": 2,
			Store: "Bbc",
			City: "Vyz",
			State: "IL",
		},
		{
			"S no": 3,
			Store: "Cbc",
			City: "Uyz",
			State: "TX",
		},
		{
			"S no": 4,
			Store: "Dbc",
			City: "Tyz",
			State: "WA",
		},
	]);
	const [columnDefs, setColumnDefs] = useState<ColDef<storeType>[]>([
		{
			field: undefined,
			cellRenderer: DelIcon,
			onCellClicked: (event) =>
				setRowData((prev) =>
					prev.filter((ele) => ele["S no"] != event.data?.["S no"])
				),
		},
		{ field: "S no" },
		{ field: "Store" },
		{ field: "City" },
		{ field: "State" },
	]);
	return (
		<div className="h-10/12 w-full">
			<AgGridReact
				theme={themeAlpine}
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={{
					filter: true,
				}}
			/>
			<div className="h-2/12 bg-gray-100 w-full flex items-center"></div>
		</div>
	);
};

export default StoresPage;
