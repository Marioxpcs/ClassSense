import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  private readonly KEYS = {
    CLASSES: '@ClassSense:classes',
    ATTENDANCE: '@ClassSense:attendance',
    EVALUATIONS: '@ClassSense:evaluations',
    SETTINGS: '@ClassSense:settings',
    USER_PROFILE: '@ClassSense:userProfile',
  };

  async saveClasses(classes: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.CLASSES, JSON.stringify(classes));
    } catch (error) {
      console.error('Error saving classes:', error);
      throw error;
    }
  }

  async loadClasses(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.CLASSES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading classes:', error);
      return [];
    }
  }

  async saveAttendance(attendance: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.ATTENDANCE, JSON.stringify(attendance));
    } catch (error) {
      console.error('Error saving attendance:', error);
      throw error;
    }
  }

  async loadAttendance(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.ATTENDANCE);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading attendance:', error);
      return [];
    }
  }

  async saveEvaluations(evaluations: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.EVALUATIONS, JSON.stringify(evaluations));
    } catch (error) {
      console.error('Error saving evaluations:', error);
      throw error;
    }
  }

  async loadEvaluations(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.EVALUATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading evaluations:', error);
      return [];
    }
  }

  async saveSettings(settings: Record<string, any>): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  async loadSettings(): Promise<Record<string, any>> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.SETTINGS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading settings:', error);
      return {};
    }
  }

  async saveUserProfile(profile: Record<string, any>): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  }

  async loadUserProfile(): Promise<Record<string, any> | null> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(this.KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  async exportData(): Promise<string> {
    try {
      const classes = await this.loadClasses();
      const attendance = await this.loadAttendance();
      const evaluations = await this.loadEvaluations();
      const settings = await this.loadSettings();
      const profile = await this.loadUserProfile();

      const data = {
        classes,
        attendance,
        evaluations,
        settings,
        profile,
        exportDate: new Date().toISOString(),
      };

      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);

      if (data.classes) await this.saveClasses(data.classes);
      if (data.attendance) await this.saveAttendance(data.attendance);
      if (data.evaluations) await this.saveEvaluations(data.evaluations);
      if (data.settings) await this.saveSettings(data.settings);
      if (data.profile) await this.saveUserProfile(data.profile);
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }
}

export default new StorageService();
