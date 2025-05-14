
export interface Child {
  id: number;
  name: string;
  age: number | null;
  birthday: string | null;
  school: string | null;
  grade: string | null;
  teacher: string | null;
  bloodType: string | null;
  allergies: string[];
  medications: string[];
  height: string | null;
  weight: string | null;
  lastCheckup: string | null;
  activities: string[];
  imageUrl: string | null;
  initials: string | null;
  gender: 'male' | 'female';
}

export interface ScheduleDay {
  day: string;
  activities: string[];
}
