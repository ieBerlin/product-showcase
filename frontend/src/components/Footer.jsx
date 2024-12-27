import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaPinterestP,
  FaTwitter,
  FaVimeo,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Customer Service */}
          <div className="flex flex-col  items-center justify-center">
            <h5 className="text-lg font-semibold text-gray-800">
              Customer Service
            </h5>
            <ul className="">
              <li>
                <a
                  href="#"
                  className="text-gray-700 text-sm hover:text-gray-900"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 text-sm hover:text-gray-900"
                >
                  Retailers
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col  items-center justify-center">
            <h5 className="text-lg font-semibold text-gray-800">Follow Us</h5>
            <div className="flex space-x-5">
              <a
                href="#"
                aria-label="Vimeo"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaVimeo className="w-3 h-3" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaFacebookF className="w-3 h-3" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaInstagram className="w-3 h-3" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTwitter className="w-3 h-3" />
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaPinterestP className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col  items-center justify-center">
            <h5 className="text-lg font-semibold text-gray-800">Legal</h5>
            <ul className="">
              <li>
                <a
                  href="#"
                  className="text-gray-700 text-sm hover:text-gray-900"
                >
                  Shipping and Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 text-sm hover:text-gray-900"
                >
                  Copyright
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className=" border-t border-gray-300 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
