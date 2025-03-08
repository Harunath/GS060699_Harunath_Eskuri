import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import StoresPage from "../pages/Stores/StoresPage";
import SKUsPage from "../pages/SKUs/SKUsPage";
import PlanningPage from "../pages/Planning/PlanningPage";
import ChartPage from "../pages/Chart/ChartPage";

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* The Layout route wraps all child routes */}
				<Route path="/" element={<Layout />}>
					{/* The default route (/) could show the StoresPage or a HomePage */}
					<Route index element={<StoresPage />} />
					<Route path="sku" element={<SKUsPage />} />
					<Route path="planning" element={<PlanningPage />} />
					<Route path="chart" element={<ChartPage />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default AppRouter;
