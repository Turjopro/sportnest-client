import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../context/useAuth';
import Loading from '../components/Loading';

const FacilityDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [hours, setHours] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/facilities/${id}`)
      .then((res) => {
        setFacility(res.data);
        if (res.data?.available_slots?.length) {
          setSlot(res.data.available_slots[0]);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!facility) {
    return (
      <p className="py-20 text-center text-gray-500">Facility not found.</p>
    );
  }

  const totalPrice = Number(facility.price_per_hour) * Number(hours || 0);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!date) {
      return toast.error('Please select a booking date.');
    }
    setSubmitting(true);

    const booking = {
      facility_id: facility._id,
      facility_name: facility.name,
      facility_image: facility.image,
      user_email: user.email,
      booking_date: date,
      time_slot: slot,
      hours: Number(hours),
      total_price: totalPrice,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/bookings`, booking, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success('Facility booked successfully!');
          navigate('/my-bookings');
        }
      })
      .catch(() => toast.error('Booking failed. Please try again.'))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Facility Info */}
        <div>
          <img
            src={facility.image}
            alt={facility.name}
            className="h-80 w-full rounded-2xl object-cover"
          />
          <span className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {facility.facility_type}
          </span>
          <h1 className="mt-2 text-2xl font-bold text-gray-800 md:text-3xl">
            {facility.name}
          </h1>
          <p className="mt-1 text-gray-500">📍 {facility.location}</p>
          <p className="mt-4 text-gray-600">{facility.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <p className="rounded-lg bg-gray-50 p-3">
              <span className="block text-gray-400">Price</span>
              <span className="font-semibold text-gray-800">
                ৳{facility.price_per_hour}/hour
              </span>
            </p>
            <p className="rounded-lg bg-gray-50 p-3">
              <span className="block text-gray-400">Capacity</span>
              <span className="font-semibold text-gray-800">
                {facility.capacity} people
              </span>
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Book This Facility</h2>
          <form onSubmit={handleBooking} className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Facility Name
              </label>
              <input
                type="text"
                value={facility.name}
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Booking Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Time Slot
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              >
                {(facility.available_slots || []).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Hours
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Total Price
              </label>
              <input
                type="text"
                readOnly
                value={`৳${totalPrice}`}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 font-semibold text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-primary py-2.5 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
