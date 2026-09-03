# SportNest (Client)

**SportNest** is a full-stack sports facility booking platform where users
can explore football turfs, badminton courts, swimming lanes and tennis
courts, and book a specific date and time slot. Logged-in users can also
list and manage their own facilities.

## Purpose
This is the client-side (frontend) of SportNest, built with React and
Tailwind CSS. It communicates with the [SportNest Server](https://github.com/Turjopro/sportnest-server)
for authentication, facility data, and booking management.

## Live URL
- Client: https://sportnest-client-2nl2.vercel.app
- Server: https://sportnest-server-usu2.onrender.com

## Tech Stack
- React (Vite)
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Axios

## Features
- 🔑 Firebase Authentication (Email/Password + Google Login)
- 🍪 JWT stored in httpOnly cookie for protecting private routes/APIs
- 🏟️ Browse all facilities with search (by name) and filter (by sport type)
- 📅 Book a facility for a specific date, time slot and number of hours
- ✏️ Add / update / delete your own facilities (owner-only, with delete confirmation)
- 📖 View and cancel your own bookings
- 📱 Fully responsive design for mobile, tablet and desktop
- 🚫 Custom 404 page and loading spinner
- 🔄 Private routes persist correctly on page reload (no unwanted login redirect)

## Pages / Routes
| Route                    | Access   | Description                       |
|---------------------------|----------|-------------------------------------|
| `/`                       | Public   | Home page (banner + featured facilities) |
| `/facilities`             | Public   | All facilities (search + filter)   |
| `/facility/:id`           | Private  | Facility details + booking form    |
| `/login`                  | Public   | Login page                         |
| `/register`               | Public   | Registration page                  |
| `/add-facility`           | Private  | Add a new facility                 |
| `/manage-facilities`      | Private  | Manage/update/delete own facilities |
| `/update-facility/:id`    | Private  | Update a facility                  |
| `/my-bookings`            | Private  | View and cancel own bookings       |
| `*`                       | —        | Custom 404 Not Found page          |

## NPM Packages Used
- `react`, `react-dom` — UI library
- `react-router-dom` — client-side routing
- `firebase` — authentication
- `axios` — API requests
- `react-hook-form` — form handling and validation
- `react-hot-toast` — toast notifications
- `react-icons` — icon set
- `tailwindcss` — styling

## Environment Variables
Create a `.env` file in the root based on `.env.example`, including:



## Getting Started Locally
```bash
git clone https://github.com/Turjopro/sportnest-client.git
cd sportnest-client
npm install
npm run dev
```