import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../context/useAuth';
import Loading from '../components/Loading';

const ManageFacilities = () => {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFacilities = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/my-facilities`, {
        params: { email: user.email },
        withCredentials: true,
      })
      .then((res) => setFacilities(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) loadFacilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this facility? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    axios
      .delete(`${import.meta.env.VITE_API_URL}/facilities/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success('Facility deleted successfully');
          setFacilities((prev) => prev.filter((f) => f._id !== id));
        }
      })
      .catch(() => toast.error('Failed to delete facility'));
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
        Manage My Facilities
      </h1>

      {facilities.length === 0 ? (
        <p className="mt-16 text-center text-gray-500">
          You haven&apos;t added any facilities yet.{' '}
          <Link to="/add-facility" className="font-semibold text-primary">
            Add one now
          </Link>
          .
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">Facility</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price/Hour</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((f) => (
                <tr key={f._id} className="border-t">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="h-10 w-14 rounded-md object-cover"
                    />
                    <span className="font-medium text-gray-800">{f.name}</span>
                  </td>
                  <td className="px-4 py-3">{f.facility_type}</td>
                  <td className="px-4 py-3">৳{f.price_per_hour}</td>
                  <td className="px-4 py-3">{f.booking_count || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/update-facility/${f._id}`}
                        className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(f._id)}
                        className="rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageFacilities;
