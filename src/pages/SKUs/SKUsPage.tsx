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
import Loading from "../../components/common/Loading";
import ErrorPage from "../../components/common/ErrorPage";
import AddNewSKU from "./AddNewSKU";
import { api } from "../../lib/constants";
import Cookies from "js-cookie";

ModuleRegistry.registerModules([AllCommunityModule]);

const DelIcon = () => {
	return <Trash2 className="h-full" />;
};

const SKUsPage = () => {
	const { data, loading, error, setData, fetchData } = useSKUStore();
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (data.length == 0) fetchData();
	}, []);

	const updatSKU = async (id: string, price: number, cost: number) => {
		const token = Cookies.get("token");
		if (id && token && price && cost) {
			try {
				await fetch(`${api}/sku/${id}`, {
					method: "PUT",
					body: JSON.stringify({ price, cost }),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				fetchData();
			} catch (error) {
				console.log(error);
			}
		}
	};
	const [columnDefs] = useState<ColDef<SKUType>[]>([
		{
			headerName: "",
			cellRenderer: DelIcon,
			onCellClicked: (event) => {
				setData((prevData: SKUType[]) => {
					const updatedData = prevData.filter(
						(ele) => ele.id !== event.data?.id
					);
					return updatedData;
				});
			},
			pinned: "left",
			maxWidth: 100,
		},
		{ headerName: "id", hide: true },
		{
			field: "label",
			headerName: "SKU",
			pinned: "left",
			editable: true,
			onCellValueChanged: (event) => {
				setData((prevData: SKUType[]) => {
					const updatedData = prevData.map((ele) =>
						ele.id === event.data.id
							? { ...ele, label: String(event.newValue) || ele.label }
							: ele
					);
					return updatedData;
				});
			},
		},
		{
			field: "price",
			headerName: "Price",
			editable: true,
			onCellValueChanged: (event) => {
				updatSKU(event.data.id, event.newValue, Number(event.data.cost));
				setData((prevData: SKUType[]) => {
					const updatedData = prevData.map((ele) =>
						ele.id === event.data.id
							? {
									...ele,
									price: String(parseFloat(event.newValue)) || ele.price,
							  }
							: ele
					);
					return updatedData;
				});
			},
			valueFormatter: (params) => "$ " + parseFloat(params.value).toFixed(2),
		},
		{
			field: "cost",
			headerName: "Cost",
			editable: true,
			onCellValueChanged: (event) => {
				updatSKU(event.data.id, Number(event.data.price), event.newValue);
				setData((prevData: SKUType[]) => {
					const updatedData = prevData.map((ele) =>
						ele.id === event.data.id
							? { ...ele, cost: String(parseFloat(event.newValue)) || ele.cost }
							: ele
					);
					return updatedData;
				});
			},
			valueFormatter: (params) => "$ " + parseFloat(params.value).toFixed(2),
		},
	]);
	if (loading) <Loading />;
	if (error) <ErrorPage error={error} />;
	return (
		<div className="h-10/12 w-full bg-white z-0">
			{open && <AddNewSKU close={() => setOpen(false)} />}
			<AgGridReact
				theme={themeAlpine}
				rowData={data}
				columnDefs={columnDefs}
				defaultColDef={{
					filter: true,
				}}
				className="z-0"
			/>
			<div className="h-2/12 bg-gray-100 w-full flex items-center">
				<button
					onClick={() => setOpen(true)}
					className=" py-2 px-4 bg-orange-300 rounded">
					Add SKU
				</button>
			</div>
		</div>
	);
};

export default SKUsPage;
