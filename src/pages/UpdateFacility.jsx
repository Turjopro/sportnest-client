import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import usePageTitle from '../hooks/usePageTitle';

const facilityTypes = [
  'Football Turf',
  'Badminton Court',
  'Swimming Lane',
  'Tennis Court',
  'Cricket Net',
  'Basketball Court',
];

const UpdateFacility = () => {
  usePageTitle('Update Facility');
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/facilities/${id}`)
      .then((res) => {
        const f = res.data;
        reset({
          ...f,
          available_slots: (f.available_slots || []).join(', '),
        });
      })
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = (data) => {
    const updatedFacility = {
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
    };

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/facilities/${id}`,
        updatedFacility,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success('Facility updated successfully!');
          navigate('/manage-facilities');
        } else {
          toast.success('No changes made.');
          navigate('/manage-facilities');
        }
      })
      .catch(() => toast.error('Failed to update facility.'));
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
        Update Facility
      </h1>

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
            Image URL
          </label>
          <input
            {...register('image', { required: true })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
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
            Available Time Slots (comma separated)
          </label>
          <input
            {...register('available_slots', { required: true })}
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

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-2.5 font-semibold text-white transition hover:bg-primary/90"
          >
            Update Facility
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFacility;
