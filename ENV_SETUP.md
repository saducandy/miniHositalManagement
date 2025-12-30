# Environment Variables Setup

## API Base URL Configuration

This project uses environment variables to manage the API base URL centrally. All API requests are configured through the `src/config/api.ts` file.

## Setup Instructions

1. **Create a `.env` file** in the root directory of the project (same level as `package.json`)

2. **Add the following content** to the `.env` file:

```env
VITE_API_BASE_URL=https://strapi.hielav.com
```

3. **Important Notes:**
   - In Vite projects, environment variables must be prefixed with `VITE_` to be exposed to the client-side code
   - The `.env` file should be added to `.gitignore` (it should already be there)
   - Never commit the `.env` file to version control

## Usage

All components now use the centralized API configuration:

- `getApiUrl(endpoint)` - Returns the full API URL for an endpoint
- `getImageUrl(imagePath)` - Returns the full image URL for image paths from the API

## Example

```typescript
import { getApiUrl, getImageUrl } from '../../config/api';

// Instead of:
fetch('https://strapi.hielav.com/api/ec-doctors?populate=*')

// Use:
fetch(getApiUrl('api/ec-doctors?populate=*'))

// For images:
const imageUrl = getImageUrl(doctor.image?.url);
```

## Changing the Base URL

To change the API base URL, simply update the `VITE_API_BASE_URL` value in your `.env` file and restart the development server.

## Files Updated

The following files have been updated to use the centralized API configuration:

- `src/components/Doctors/DoctorsPage.tsx`
- `src/components/Events/EventsPage.tsx`
- `src/components/Contact/ContactPage.tsx`
- `src/components/Appointments/AppointmentBooking.tsx`
- `src/components/Admin/AdminDashboard.tsx`




