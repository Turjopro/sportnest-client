import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../context/useAuth';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => toast.success('Logged out successfully'))
      .catch(() => toast.error('Something went wrong'));
    setOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 font-medium transition ${
      isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
    }`;

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/facilities" className={navLinkClass}>
        All Facilities
      </NavLink>
      {user && (
        <>
          <NavLink to="/my-bookings" className={navLinkClass}>
            My Bookings
          </NavLink>
          <NavLink to="/add-facility" className={navLinkClass}>
            Add Facility
          </NavLink>
          <NavLink to="/manage-facilities" className={navLinkClass}>
            Manage My Facilities
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">SportNest</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">{links}</div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full border px-2 py-1"
              >
                <img
                  src={
                    user.photoURL ||
                    'https://i.ibb.co/2FsfXqM/default-avatar.png'
                  }
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white p-2 shadow-lg">
                  <p className="truncate px-3 py-2 text-sm text-gray-500">
                    {user.email}
                  </p>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/my-bookings"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/add-facility"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Add Facility
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/manage-facilities"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Manage My Facilities
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-1 w-full rounded-lg bg-primary px-3 py-2 text-left text-sm text-white hover:bg-primary/90"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-primary px-6 py-2 font-medium text-white transition hover:bg-primary/90"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
       <button
  onClick={() => setOpen(!open)}
  aria-label="Open profile menu"
  className="flex items-center gap-2 rounded-full border px-2 py-1"
>
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-1 border-t bg-white px-4 py-3 md:hidden">
          {links}
          {user ? (
            <button
              onClick={handleLogout}
              className="mt-2 rounded-full bg-primary px-4 py-2 text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-white"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
