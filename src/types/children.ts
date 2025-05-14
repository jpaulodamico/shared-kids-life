
export interface Child {
  id: number;
  name: string;
  age: number;
  birthday: string;
  school: string;
  grade: string;
  teacher: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  height: string;
  weight: string;
  lastCheckup: string;
  activities: string[];
  imageUrl: string;
  initials: string;
  gender: 'male' | 'female';
}

export interface ScheduleDay {
  day: string;
  activities: string[];
}
