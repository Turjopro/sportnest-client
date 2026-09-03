import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../context/useAuth';
import Loading from '../components/Loading';

const statusStyles = {
  pending: 'bg-yellow-50 text-yellow-600',
  confirmed: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-600',
};

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/bookings`, {
        params: { email: user.email },
        withCredentials: true,
      })
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, [user]);

  const handleCancel = (id) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking?'
    );
    if (!confirmCancel) return;

    axios
      .delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success('Booking cancelled successfully');
          setBookings((prev) => prev.filter((b) => b._id !== id));
        }
      })
      .catch(() => toast.error('Failed to cancel booking'));
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="mt-16 text-center text-gray-500">
          You haven&apos;t booked any facility yet.{' '}
          <Link to="/facilities" className="font-semibold text-primary">
            Browse facilities
          </Link>
          .
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">Facility</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time Slot</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={b.facility_image}
                      alt={b.facility_name}
                      className="h-10 w-14 rounded-md object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {b.facility_name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{b.booking_date}</td>
                  <td className="px-4 py-3">{b.time_slot}</td>
                  <td className="px-4 py-3">৳{b.total_price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        statusStyles[b.status] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                    >
                      Cancel
                    </button>
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

export default MyBookings;
