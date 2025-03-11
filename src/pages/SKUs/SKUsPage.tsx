import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import {
	ModuleRegistry,
	AllCommunityModule,
	themeAlpine,
} from "ag-grid-community";
import { useEffect, useState } from "react";
import { SKUType, useSKUStore } from "../../store/skuStore";
import { Trash2 } from "lucide-react";
import { MessageLoading } from "../../components/ui/message-loading";

ModuleRegistry.registerModules([AllCommunityModule]);

const DelIcon = () => {
	return <Trash2 className="h-full" />;
};

const SKUsPage = () => {
	const { data, loading, error, setData, fetchData } = useSKUStore();
	useEffect(() => {
		fetchData();
	}, []);
	const [columnDefs] = useState<ColDef<SKUType>[]>([
		{
			headerName: "",
			cellRenderer: DelIcon,
			onCellClicked: (event) => {
				const updatedData = data.filter((ele) => ele.id !== event.data?.id);
				setData(updatedData);
			},
			pinned: "left",
			maxWidth: 100,
		},
		{ headerName: "id", hide: true },
		{ field: "label", headerName: "SKU", pinned: "left" },
		{
			field: "price",
			headerName: "Price",
			valueFormatter: (params) => "$ " + parseFloat(params.value).toFixed(2),
		},
		{
			field: "cost",
			headerName: "Cost",
			valueFormatter: (params) => "$ " + parseFloat(params.value).toFixed(2),
		},
	]);
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
		<div className="h-10/12 w-full bg-white">
			<AgGridReact
				theme={themeAlpine}
				rowData={data}
				columnDefs={columnDefs}
				defaultColDef={{
					filter: true,
				}}
			/>
			<div className="h-2/12 bg-gray-100 w-full flex items-center">
				<button className=" py-2 px-4 bg-orange-300 rounded">Add SKU</button>
			</div>
		</div>
	);
};

export default SKUsPage;
