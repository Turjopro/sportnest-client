# SportNest (Client)

## Purpose
SportNest is a full-stack sports facility booking platform where users can
explore football turfs, badminton courts, swimming lanes and tennis courts,
and book a specific date and time slot. Logged-in users can also list and
manage their own facilities.

## Live URL
- Client: <your-live-client-link-here>
- Server: <your-live-server-link-here>
## Live URL - Client: https://sportnest-client-2nl2.vercel.app - Server: https://sportnest-server-usu2.onrender.com
## Features
- Firebase Authentication (Email/Password + Google Login)
- JWT stored in httpOnly cookie for protecting private routes/APIs
- Browse all facilities with search (by name) and filter (by sport type)
- Book a facility for a specific date, time slot and number of hours
- Add / update / delete your own facilities (owner-only, with delete confirmation)
- View and cancel your own bookings
- Fully responsive design for mobile, tablet and desktop
- Custom 404 page and loading spinner
- Private routes persist correctly on page reload (no unwanted login redirect)

## NPM Packages Used
- react, react-dom, react-router-dom
- firebase
- axios
- react-hook-form
- react-hot-toast
- react-icons
- framer-motion
- tailwindcss

## Environment Variables
Create a `.env` file based on `.env.example` with your Firebase config and
API URL.
