import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { ClassProvider } from './context/ClassContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { EvaluationProvider } from './context/EvaluationContext';

const App: React.FC = () => {
  return (
    <ClassProvider>
      <AttendanceProvider>
        <EvaluationProvider>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </EvaluationProvider>
      </AttendanceProvider>
    </ClassProvider>
  );
};

export default App;
