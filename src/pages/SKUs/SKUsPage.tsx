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
	id: string;
	SKU: string;
	Price: string;
	Cost: string;
}

const DelIcon = () => {
	return <Trash2 className="h-full" />;
};

const SKUsPage = () => {
	const [rowData, setRowData] = useState<storeType[]>([
		{
			id: "SK00158",
			SKU: "Crew Neck Merino Wool Sweater",
			Price: " $ 114.99 ",
			Cost: " $ 18.28 ",
		},
		{
			id: "SK00269",
			SKU: "Faux Leather Leggings",
			Price: " $ 9.99 ",
			Cost: " $ 8.45 ",
		},
		{
			id: "SK00300",
			SKU: "Fleece-Lined Parka",
			Price: " $ 199.99 ",
			Cost: " $ 17.80 ",
		},
		{
			id: "SK00304",
			SKU: "Cotton Polo Shirt",
			Price: " $ 139.99 ",
			Cost: " $ 10.78 ",
		},
	]);
	const [columnDefs, setColumnDefs] = useState<ColDef<storeType>[]>([
		{
			field: undefined,
			cellRenderer: DelIcon,
			onCellClicked: (event) =>
				setRowData((prev) => prev.filter((ele) => ele.id != event.data?.id)),
		},
		{ field: "id", hide: true },
		{ field: "SKU" },
		{ field: "Price" },
		{ field: "Cost" },
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

export default SKUsPage;
