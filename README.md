# FitLife Dashboard

A modern, responsive fitness tracking dashboard built with React and Vite. This frontend-only application provides a complete fitness tracking experience with data visualization, progress monitoring, and program management.

![FitLife Dashboard](https://via.placeholder.com/800x400/14b8a6/ffffff?text=FitLife+Dashboard)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
fitlife-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── context/            # React Context for state management
│   ├── data/               # Mock data and utilities
│   ├── utils/              # Helper functions
│   ├── tests/              # Unit tests
│   └── main.jsx           # App entry point
├── public/                 # Static assets
└── README.md
```

## 🎨 Features

### Core Functionality
- **Dashboard Overview**: Key metrics, charts, and activity feed
- **Progress Tracking**: Weight history, body fat, and workout frequency
- **Upload System**: Date-locked progress updates with form validation
- **Program Management**: Browse and join fitness programs
- **Settings**: Theme customization and update day configuration

### Data Visualization
- Weight progress line chart (last 12 updates)
- Workout frequency bar chart (last 4 weeks)
- Macros breakdown donut chart
- Interactive tooltips and responsive design

### Lock Logic System
- Configurable update day (default: 26th of each month)
- Form locks after submission until next update day
- Local storage persistence with expiry dates
- Clear status messages and validation

## 🔧 Configuration

### Update Day Settings
The app uses a configurable update day system. To change when users can update their data:

1. Go to Settings page
2. Modify "Update Day of Month" setting
3. Changes are saved to localStorage

**Default**: 26th of each month

### Theme Customization
Two theme options available:
- **Dribbble**: Soft teal and coral color palette (default)
- **Light**: Clean minimal design

## 🔌 Supabase Integration

### Current State
The app currently uses localStorage for data persistence. All data is stored locally and will be lost if browser data is cleared.

### Integration Steps

#### 1. Environment Setup
Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 2. Database Schema
Create the following tables in your Supabase database:

```sql
-- User uploads table
CREATE TABLE uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  date DATE NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  body_fat DECIMAL(4,2) NOT NULL,
  calories INTEGER,
  notes TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workouts table
CREATE TABLE workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  date DATE NOT NULL,
  type VARCHAR(50) NOT NULL,
  duration INTEGER NOT NULL,
  calories INTEGER NOT NULL,
  exercises TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  update_day INTEGER DEFAULT 26,
  theme VARCHAR(20) DEFAULT 'dribbble',
  notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Key Integration Points

**DashboardContext.jsx** - Replace localStorage calls:
```javascript
// Current (localStorage)
const addUploadEntry = async (entry) => {
  // localStorage implementation
};

// Replace with Supabase
const addUploadEntry = async (entry) => {
  const { data, error } = await supabase
    .from('uploads')
    .insert([entry])
    .select();
  
  if (error) throw error;
  // Update local state
};
```

**Storage utilities** - Update `src/utils/storage.js`:
```javascript
// Replace localStorage calls with Supabase queries
export const getUploadLockData = async () => {
  const { data } = await supabase
    .from('uploads')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  return {
    submittedDates: data.map(entry => entry.date),
    nextUnlockDate: getNextUpdateDate(new Date(), updateDay)
  };
};
```

#### 4. Authentication Integration
For user authentication, integrate with Clerk or Supabase Auth:

```javascript
// Example with Supabase Auth
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Add to DashboardContext
const [user, setUser] = useState(null);

useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setUser(session?.user ?? null);
    }
  );

  return () => subscription.unsubscribe();
}, []);
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage
- Upload lock logic and date validation
- Form submission and validation
- Local storage operations
- Date utility functions

## 📱 Responsive Design

The dashboard is fully responsive with:
- Mobile-first design approach
- Collapsible sidebar on small screens
- Stacked chart layout on mobile
- Touch-friendly interface elements

## 🎯 Key Features Summary

### Where to Find:

1. **Lock Logic**: `src/utils/dateUtils.js` and `src/components/UploadForm.jsx`
2. **Mock Data**: `src/data/mockData.js` - Contains all sample data
3. **Update Day Setting**: `src/pages/SettingsPage.jsx` - User can change update day
4. **Supabase Integration Points**: 
   - `src/context/DashboardContext.jsx` - Main data operations
   - `src/utils/storage.js` - Storage utilities
   - `src/components/UploadForm.jsx` - Form submission
5. **How to Run**: `npm install && npm run dev`
6. **How to Test**: `npm test`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the README for common solutions
2. Review the code comments for integration points
3. Open an issue on GitHub

---

**Note**: This is a frontend-only application. Backend integration requires setting up Supabase or another database service as outlined in the integration section.
