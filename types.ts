
export enum ActivityLevel {
  SEDENTARY = 'Sedentário',
  LIGHT = 'Leve',
  MODERATE = 'Moderado',
  ACTIVE = 'Ativo',
  VERY_ACTIVE = 'Muito Ativo'
}

export enum WorkEnvironment {
  SHADE = 'Sombra/Escritório',
  SUN = 'Exposto ao Sol',
  MIXED = 'Misto'
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  weight: number; 
  height: number;
  activityLevel: ActivityLevel;
  workEnvironment: WorkEnvironment;
  sittingPercentage: number;
  notificationInterval: number;
  containerCapacity: number;
  containerType: string;
  lastCalculatedGoal: number;
  themeColor: string;
}

export interface WaterLog {
  id: string;
  amount: number;
  timestamp: number;
}
