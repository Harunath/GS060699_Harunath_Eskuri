import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import {
	ModuleRegistry,
	AllCommunityModule,
	themeAlpine,
} from "ag-grid-community";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useStoreStore, StoreType } from "../../store/storeStore";
import { MessageLoading } from "../../components/ui/message-loading";

ModuleRegistry.registerModules([AllCommunityModule]);

const DelIcon = () => {
	return <Trash2 className="h-full" />;
};

const StoresPage = () => {
	const { data, loading, error, fetchData, setData } = useStoreStore();
	const [columnDefs] = useState<ColDef<StoreType>[]>([
		{
			headerName: "",
			cellRenderer: DelIcon,
			onCellClicked: (event) => {
				const updatedData = data.filter(
					(ele) => ele["S no"] !== event.data?.["S no"]
				);
				setData(updatedData);
			},
			pinned: "left",
			maxWidth: 100,
		},
		{
			headerName: "S.No",
			valueGetter: (params) =>
				params?.node?.rowIndex ? params.node.rowIndex + 1 : 1,
			maxWidth: 100,
			pinned: "left",
		},
		{
			field: "label", // Assuming "store" is an object with a "name" field
			headerName: "Store",
			width: 200,
			pinned: "left",
		},
		{
			field: "city",
			headerName: "City",
			width: 120,
			sortable: true, // Allow sorting
			filter: "agTextColumnFilter", // Enable text filtering
		},
		{
			field: "state",
			headerName: "State",
			width: 120,
			sortable: true,
			filter: "agTextColumnFilter",
		},
	]);
	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="h-10/12 w-full flex justify-center items-center bg-white">
				<p className="text-5xl">
					<MessageLoading />
				</p>
			</div>
		);
	}
	if (error) {
		<div className="h-10/12 w-full flex justify-center bg-white">
			<p className="text-5xl">error : {error}</p>
		</div>;
	}
	return (
		<div className="h-10/12 w-full">
			<AgGridReact
				theme={themeAlpine}
				rowData={data}
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
