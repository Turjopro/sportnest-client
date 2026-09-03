import { Link } from 'react-router-dom';

const FALLBACK_IMAGE =
  'https://placehold.co/600x400?text=SportNest';

const FacilityCard = ({ facility }) => {
  const {
    _id,
    name,
    facility_type,
    image,
    location,
    price_per_hour,
  } = facility;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={image}
        alt={name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {facility_type}
        </span>
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">📍 {location}</p>
        <div className="mt-3 flex flex-1 items-end justify-between">
          <p className="font-semibold text-gray-800">
            ৳{price_per_hour}
            <span className="text-sm font-normal text-gray-500">/hour</span>
          </p>
          <Link
            to={`/facility/${_id}`}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;