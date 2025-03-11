import { UserCircle } from "lucide-react";
import logo from "../../assets/Gsynergy Logo V2 Long Description.svg";

const TopNav = () => {
	return (
		<nav className="w-full flex items-center justify-between px-6 py-2 bg-white shadow-md min-w-[1080px] min-h-16">
			{/* Left Side - Logo */}
			<div className="flex items-center space-x-2">
				<img src={logo} alt="GSynergy" className="h-12" />
			</div>

			{/* Center - Title */}
			<h1 className="text-xl font-semibold text-gray-800">Data Viewer App</h1>

			{/* Right Side - User Icon */}
			<div className="flex items-center space-x-2">
				<UserCircle className="w-6 h-6 text-gray-600" />
				<button className="text-gray-600 text-sm">▾</button>
			</div>
		</nav>
	);
};

export default TopNav;
