import { BiGlobe, BiHeart, BiShoppingBag } from "react-icons/bi";

export default function Header() {
  return (
    <header className="px-8 py-2  flex justify-between items-center">
      <div className="flex items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">✂️</div>

        {/* Navigation */}
        <nav className="flex space-x-8 text-sm text-gray-600">
          <a href="#" className="hover:text-black">
            CUSTOM
          </a>
          <a href="#" className="hover:text-black">
            LOOKBOOK
          </a>
          <a href="#" className="hover:text-black">
            ABOUT US
          </a>
        </nav>
      </div>

      {/* Right Header Items */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1">
          <BiGlobe className="w-5 h-5" />
          <select className="text-sm bg-transparent">
            <option>EN</option>
          </select>
        </div>
        <BiHeart className="w-5 h-5" />
        <BiShoppingBag className="w-5 h-5" />
      </div>
    </header>
  );
}
