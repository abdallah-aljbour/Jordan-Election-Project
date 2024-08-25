import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/photo.png";

function Footer() {
  return (
    <>
      <footer className="footer  bg-base-200 text-primary-content p-10 flex items-center gap-28">
        <aside className="flex">
          <img src={logo} className="w-28" alt="" />
          <div className="footer-div">
            <p className="text-black-500 font-bold text-2xl">صوتك</p>
            <p className=" text-black-500 font-semibold text-lg">
              "صوتك... مستقبل الأردن يبدأ هنا" بصوتك تصنع القرار و تنهض بالأردن"
            </p>
          </div>
        </aside>

        <nav className="grid grid-flow-col gap-4">
          <ul className="flex flex-col gap-9 mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                to="/SupportPage"
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700  "
              >
                الدعم الفني
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link
                to="/Debates"
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                المناظرات
              </Link>
            </li>
            <li>
              <Link
                to="/LocalOrParty"
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                طلب انشاء قائمة
              </Link>
            </li>
          </ul>
          {/* <a className="link link-hover text-black-500 transition-all text-lg hover:text-red-600">
            المناظرات
          </a>
          <a className="link link-hover text-black-500 transition-all text-nowrap text-lg hover:text-red-600">
            الحملات الأنتخابية
          </a>
          <a className="link link-hover text-black-500 transition-all text-nowrap text-lg hover:text-red-600">
            حملات المرشحين
          </a> */}
        </nav>
        <p className="text-black-500">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </footer>
    </>
  );
}

export default Footer;
