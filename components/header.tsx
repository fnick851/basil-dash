import Link from 'next/link'
import { logout } from '../utils/auth'

const Header = (props: { isLoggedIn: boolean }) => {
  return (
    <header>
      <nav>
        <ul className="flex list-none bg-green-300 py-4">
          <li className="ml-auto">
            <Link href="/">
              <a className="hover:bg-gray-200 hover:border-gray-200 border-solid border border-white rounded bg-white shadow p-2">
                Dashboard
              </a>
            </Link>
          </li>
          {props.isLoggedIn ? (
            <li className="mx-4">
              <a
                onClick={logout}
                className="cursor-pointer hover:bg-gray-200 hover:border-gray-200 border-solid border border-white rounded bg-white shadow p-2"
              >
                Logout
              </a>
            </li>
          ) : (
            <li className="mx-4">
              <Link href="/login">
                <a className="hover:bg-gray-200 hover:border-gray-200 border-solid border border-white rounded bg-white shadow p-2">
                  Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
