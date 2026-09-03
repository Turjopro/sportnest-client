import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import usePageTitle from '../hooks/usePageTitle';

const facilityTypes = [
  'Football Turf',
  'Badminton Court',
  'Swimming Lane',
  'Tennis Court',
  'Cricket Net',
  'Basketball Court',
];

const AddFacility = () => {
  usePageTitle('Add Facility');
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const facility = {
      name: data.name,
      facility_type: data.facility_type,
      image: data.image,
      location: data.location,
      price_per_hour: Number(data.price_per_hour),
      capacity: Number(data.capacity),
      available_slots: data.available_slots
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      description: data.description,
      owner_email: user.email,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/facilities`, facility, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success('Facility added successfully!');
          reset();
          navigate('/manage-facilities');
        }
      })
      .catch(() => toast.error('Failed to add facility. Please try again.'));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
        Add a New Facility
      </h1>
      <p className="mx-auto mt-2 max-w-md text-center text-gray-500">
        List your sports facility so players can find and book it.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Facility Name
          </label>
          <input
            {...register('name', { required: true })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">This field is required</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Facility Type
          </label>
          <select
            {...register('facility_type', { required: true })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          >
            {facilityTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Image URL{' '}
            <span className="text-xs font-normal text-gray-400">
              (upload to imgbb/postimage and paste link)
            </span>
          </label>
          <input
            {...register('image', { required: true })}
            placeholder="https://i.ibb.co/..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">This field is required</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            {...register('location', { required: true })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Price Per Hour (৳)
          </label>
          <input
            type="number"
            {...register('price_per_hour', { required: true, min: 0 })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            {...register('capacity', { required: true, min: 1 })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Available Time Slots{' '}
            <span className="text-xs font-normal text-gray-400">
              (comma separated)
            </span>
          </label>
          <input
            {...register('available_slots', { required: true })}
            placeholder="6AM-7AM, 7AM-8AM, 8AM-9AM"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description', { required: true })}
            rows="4"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Owner Email
          </label>
          <input
            value={user?.email || ''}
            readOnly
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-500"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-2.5 font-semibold text-white transition hover:bg-primary/90"
          >
            Add Facility
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFacility;
