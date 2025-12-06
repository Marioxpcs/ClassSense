# ClassSense

An AI-powered student planning app that analyzes course structure, topic progression, evaluation weights, and attendance patterns to help students prioritize classes and reduce academic risk across a university term.

## Overview

ClassSense is designed to help university students make informed decisions about class attendance, workload management, and academic risk. Instead of encouraging skipped coursework, the app provides data-driven insights into which classes and academic activities carry the highest impact on a student's success at any given time.

By analyzing course schedules, topic progression, evaluation weights, and attendance history, ClassSense prioritizes classes and academic events across a student's term and delivers personalized recommendations that reduce burnout while protecting academic performance.

The app is built for students managing dense schedules, overlapping classes, or fluctuating workloads, and acts as a **decision-support tool** rather than a replacement for attendance or study.

## Core Functionality

### 1. Class Priority Analysis

ClassSense evaluates every class session using multiple factors, including:

- Whether the session introduces new material
- Whether the content is extensive or conceptually heavy
- Whether the material is light or review-based
- Whether the session continues previously covered topics

Each class is assigned a priority score that clearly indicates its relative importance compared to other sessions in the same day or week.

### 2. Same-Day Class Comparison

When multiple classes occur on the same day, the app compares them against each other based on:

- Topic difficulty
- Material depth
- Proximity to major evaluations
- Historical attendance patterns

This allows students to understand which classes are academically riskier to miss when conflicts, fatigue, or time constraints arise.

### 3. Evaluation Weight & Risk Tracking

Students can log all graded components of their courses, including:

- Assignments
- Labs
- Quizzes
- Midterms
- Final exams
- Projects

ClassSense analyzes evaluation weight distributions to identify which missed or incomplete items have the greatest potential impact on final grades and highlights high-risk assessment periods.

### 4. Attendance Logging & Pattern Analysis

The app includes an attendance log that allows students to track:

- Attended sessions
- Missed classes
- Late arrivals
- Recorded or alternative viewing

Over time, ClassSense identifies attendance patterns and flags courses where absences may begin to negatively affect academic standing.

### 5. AI-Powered Academic Recommendations

Using aggregated course, attendance, and evaluation data, ClassSense generates contextual, non-prescriptive recommendations such as:

- Which classes should be prioritized during heavy weeks
- Which sessions have lower academic impact if missed
- Which evaluations cannot be affordably skipped
- Early warnings when academic risk begins to increase

Recommendations are presented as **guidance, not directives**, reinforcing responsible academic decision-making.

### 6. Academic Risk Awareness

ClassSense does not attempt to replace academic performance or automate success. Instead, it functions as a transparent decision-support system that:

- Encourages strategic planning
- Visualizes academic trade-offs
- Helps students understand consequences before making choices

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Context API** for state management
- **AsyncStorage** for local data persistence

## Project Structure

```
ClassSense/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation configuration
│   ├── context/          # Context providers for state management
│   ├── services/         # Business logic and external services
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── assets/           # Images, fonts, and other assets
│   └── App.tsx           # Root component
├── package.json
├── app.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ClassSense.git
cd ClassSense
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Install the Expo Go app on your iOS or Android device
   - Scan the QR code from the terminal

## Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## Components

### UI Components
- **ClassCard**: Display class information in a card format
- **EvaluationItem**: Show evaluation details
- **PriorityBadge**: Visual indicator for priority levels
- **AttendanceToggle**: Toggle attendance status

### Screens
- **HomeScreen**: Overview of all classes
- **ClassDetailScreen**: Detailed view of a specific class
- **ScheduleScreen**: Weekly class schedule
- **AttendanceLogScreen**: Attendance history and statistics
- **EvaluationsScreen**: List of all evaluations and grades
- **RecommendationsScreen**: AI-generated recommendations
- **SettingsScreen**: App settings and preferences

## State Management

The app uses React Context API for state management with three main contexts:
- **ClassContext**: Manages class data
- **AttendanceContext**: Handles attendance records
- **EvaluationContext**: Manages evaluations and grade calculations

## Services

- **aiService**: AI-powered recommendations and predictions
- **scoringService**: Priority score calculations
- **storageService**: Local data persistence with AsyncStorage

## Future Enhancements

- Push notifications for upcoming evaluations
- Integration with calendar apps
- Study time tracking
- GPA calculator
- Export data to CSV/PDF
- Cloud sync across devices

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please open an issue on GitHub.
