import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FacilityCard from '../components/FacilityCard';
import Loading from '../components/Loading';

const sportTypes = [
  { name: 'Football Turf', icon: '⚽' },
  { name: 'Badminton Court', icon: '🏸' },
  { name: 'Swimming Lane', icon: '🏊' },
  { name: 'Tennis Court', icon: '🎾' },
  { name: 'Cricket Net', icon: '🏏' },
  { name: 'Basketball Court', icon: '🏀' },
];

const steps = [
  {
    title: 'Choose a Facility',
    desc: 'Browse verified turfs, courts and lanes near you and compare prices.',
  },
  {
    title: 'Pick Your Slot',
    desc: 'Select a date and an available time slot that suits your schedule.',
  },
  {
    title: 'Confirm & Play',
    desc: 'Confirm your booking instantly and show up ready to play.',
  },
];

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/facilities/featured`)
      .then((res) => setFacilities(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <section className="bg-gradient-to-br from-dark to-emerald-900 px-4 py-20 text-center text-white md:px-8">
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
          Book Your Next Game in Seconds
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-200">
          SportNest connects you with football turfs, badminton courts,
          swimming lanes and tennis courts near you — book a slot anytime,
          anywhere.
        </p>
        <Link
          to="/facilities"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary/90"
        >
          Explore Facilities
        </Link>
      </section>

      {/* Dynamic Featured Facilities */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
          Featured Facilities
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-gray-500">
          Hand-picked venues that players book the most on SportNest.
        </p>

        {loading ? (
          <Loading />
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}
      </section>

      {/* Extra Static Section 1: Sport Types */}
      <section className="bg-gray-50 px-4 py-16 md:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
          Play Any Sport You Love
        </h2>
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {sportTypes.map((sport) => (
            <div
              key={sport.name}
              className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
            >
              <span className="text-4xl">{sport.icon}</span>
              <p className="mt-3 text-sm font-medium text-gray-700">
                {sport.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Static Section 2: How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
          How SportNest Works
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="rounded-2xl border border-gray-100 p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {idx + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
