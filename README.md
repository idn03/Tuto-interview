# 🧪 Teacher Discovery Mobile App

A React Native (Expo) mobile application built with TypeScript for discovering and booking teachers. The app features a clean, modern UI with bilingual support (English/Vietnamese), filtering capabilities, and a complete booking flow.

## 📱 Features

### ✅ Core Requirements (All Implemented)
- **Teacher Cards**: Clean, scrollable cards displaying teacher information
- **Profile Pictures**: Placeholder images for all teachers
- **Teacher Information**: Name, subject, location, rating (stars), and fee
- **Book Now Button**: Interactive booking functionality
- **Mock Data**: Local JSON array with 4+ teacher objects
- **Filter Functionality**: Dropdown to filter teachers by subject
- **Booking Flow**: Complete modal form with validation
- **Form Fields**: Student name, age, trial date (date picker), learning days
- **Data Logging**: Form data logged as JSON on submission

### 🎯 Bonus Features (All Implemented)
- **Bilingual Support**: Vietnamese ↔ English language toggle
- **JSON Dictionary**: Dynamic UI labels using language dictionaries
- **Success Screen**: Mock success screen after booking submission
- **Persistent Storage**: Booking data saved to AsyncStorage
- **Animations**: Smooth animations for cards and interactions
- **Responsive Design**: Clean, modern UI with proper spacing and shadows

## 🏗️ Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── Header.tsx       # App header with language toggle
│   ├── TeacherCard.tsx  # Individual teacher card component
│   ├── Filter.tsx       # Subject filter dropdown
│   ├── BookingModal.tsx # Booking form modal
│   ├── LanguageToggle.tsx # Language switcher
│   └── index.ts         # Component exports
├── screens/             # Screen components
│   ├── Home.tsx         # Main teacher discovery screen
│   └── SuccessScreen.tsx # Booking success screen
├── contexts/            # React Context providers
│   ├── LanguageContext.tsx # Language state management
│   └── ThemeContext.tsx    # Theme and styling context
├── mock/                # Mock data
│   ├── mockTeachers.tsx # Teacher data with bilingual fields
│   └── placeholder.png  # Placeholder images
├── dictionaries/        # Language dictionaries
│   ├── en.json         # English translations
│   └── vi.json         # Vietnamese translations
├── utils/               # Utility functions
│   └── globalStyles.ts # Global styling utilities
├── App.tsx             # Main app component
├── Router.tsx          # Navigation setup
└── index.ts            # App entry point
```

## 🤝 AI Assistance

This project was developed with assistance from:
- **Claude Sonnet 4**: Primary development assistance, code generation, and problem-solving
- **GitHub Copilot**: Code suggestions and autocompletion
- **Expo Documentation**: Framework guidance and best practices

## 👨‍💻 Developer

**Dang Nhat Duy**
- Task: Build a Mobile Teacher Discovery Screen
- Technology: React Native (Expo) + TypeScript
- Features: Complete booking flow with bilingual support

---

*This README documents a fully functional Teacher Discovery mobile application that meets all specified requirements and includes bonus features for enhanced user experience.*