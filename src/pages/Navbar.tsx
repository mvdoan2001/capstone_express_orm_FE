import { Menu, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { myToken, token } from "../utils/constant";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { getUser } from "../redux/user.slice";
import { BASE_URL_IMAGE } from "../utils/http";



const Navbar = () => {
  const dispatch = useAppDispatch()
  const { users } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    dispatch(getUser(token))
  }, [dispatch])
  const renderNav = () => {
    if (token) {
      let { userId }: myToken = jwtDecode(token)
      return <div>
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={`${BASE_URL_IMAGE}/${users.avatar}`}
                  alt="avt"
                />
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`/info/${userId}`}
                        className={`${active} ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                `}
                      >
                        Trang cá nhân
                      </Link>
                    )}
                  </Menu.Item>
                  <br />
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={"/upload"}
                        className={`${active} ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                `}
                      >
                        Upload
                      </Link>
                    )}
                  </Menu.Item>
                  <br />
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink to={'/'}
                        className={`${active} ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm'
                `}
                        onClick={() => {
                          localStorage.removeItem("LOGIN_USER")
                          window.location.reload()
                        }}
                      >
                        Đăng Xuất
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    } else {
      return <div>
        <Link to="/login" className="text-gray-800 font-bold">
          Login |{" "}
        </Link>
        <Link to="/signup" className="text-gray-800 font-bold">
          {" "}
          Sign Up
        </Link>
      </div>
    }
  }

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="https://seeklogo.com/images/P/pinterest-logo-8561DDA2E1-seeklogo.com.png" alt="Logo" className="h-12 w-12" />
        <div className="space-x-4">
          <Link to={"/"} className="text-gray-800 font-bold">
            Trang chủ
          </Link>
          <Link to={"/upload"} className="text-gray-800 font-bold">
            Tạo
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
        />
      </div>
      {renderNav()}
    </nav>
  );
};

export default Navbar;
