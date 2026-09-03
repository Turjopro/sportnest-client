import { useEffect, useState } from 'react';
import axios from 'axios';
import FacilityCard from '../components/FacilityCard';
import Loading from '../components/Loading';
import usePageTitle from '../hooks/usePageTitle';

const facilityTypes = [
  'all',
  'Football Turf',
  'Badminton Court',
  'Swimming Lane',
  'Tennis Court',
  'Cricket Net',
  'Basketball Court',
];

const AllFacilities = () => {
  usePageTitle('All Facilities');
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/facilities`, {
          params: { search, type },
        })
        .then((res) => setFacilities(res.data))
        .finally(() => setLoading(false));
    }, 400); // small debounce for search typing

    return () => clearTimeout(timer);
  }, [search, type]);

  // Sort facilities client-side by price without mutating the original array
  const sortedFacilities = [...facilities].sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price_per_hour - b.price_per_hour;
    if (sortOrder === 'high-to-low') return b.price_per_hour - a.price_per_hour;
    return 0;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
        All Facilities
      </h1>
      <p className="mx-auto mt-2 max-w-lg text-center text-gray-500">
        Search and filter through every sports facility available on
        SportNest.
      </p>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search facility by name..."
          className="flex-1 rounded-full border border-gray-300 px-5 py-2.5 focus:border-primary focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-full border border-gray-300 px-5 py-2.5 focus:border-primary focus:outline-none"
        >
          {facilityTypes.map((t) => (
            <option key={t} value={t}>
              {t === 'all' ? 'All Sport Types' : t}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-full border border-gray-300 px-5 py-2.5 focus:border-primary focus:outline-none"
        >
          <option value="none">Sort by Price</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : sortedFacilities.length === 0 ? (
        <p className="mt-16 text-center text-gray-500">
          No facilities found. Try a different search or filter.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedFacilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFacilities;