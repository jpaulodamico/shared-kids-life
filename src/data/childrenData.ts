
import { Child, ScheduleDay } from "@/types/children";

// Sample data for children
export const children: Child[] = [
  {
    id: 1,
    name: "Sofia Santos",
    age: 7,
    birthday: "15/06/2018",
    school: "Escola Miraflores",
    grade: "2º ano",
    teacher: "Profa. Maria Oliveira",
    bloodType: "A+",
    allergies: ["Amendoim", "Poeira"],
    medications: ["Nenhuma"],
    height: "1,25m",
    weight: "26kg",
    lastCheckup: "10/03/2025",
    activities: ["Natação", "Ballet", "Inglês"],
    imageUrl: "",
    initials: "SS",
    gender: "female"
  },
  {
    id: 2,
    name: "Lucas Santos",
    age: 5,
    birthday: "22/09/2020",
    school: "Jardim Infantil Arco-Íris",
    grade: "Pré-escolar",
    teacher: "Profa. Carla Mendes",
    bloodType: "O+",
    allergies: ["Nenhuma"],
    medications: ["Vitamina D (diária)"],
    height: "1,10m",
    weight: "20kg",
    lastCheckup: "15/04/2025",
    activities: ["Futebol", "Música"],
    imageUrl: "",
    initials: "LS",
    gender: "male"
  }
];

// Sample schedule for Sofia
export const sofiaSchedule: ScheduleDay[] = [
  { day: "Segunda", activities: ["Escola (07:30 - 12:30)", "Almoço", "Natação (15:00 - 16:00)"] },
  { day: "Terça", activities: ["Escola (07:30 - 12:30)", "Almoço", "Ballet (15:00 - 16:00)"] },
  { day: "Quarta", activities: ["Escola (07:30 - 12:30)", "Almoço", "Inglês (15:00 - 16:00)"] },
  { day: "Quinta", activities: ["Escola (07:30 - 12:30)", "Almoço", "Natação (15:00 - 16:00)"] },
  { day: "Sexta", activities: ["Escola (07:30 - 12:30)", "Almoço", "Livre"] },
  { day: "Sábado", activities: ["Livre", "Visita avós (quinzenal)"] },
  { day: "Domingo", activities: ["Livre"] }
];

// Sample schedule for Lucas
export const lucasSchedule: ScheduleDay[] = [
  { day: "Segunda", activities: ["Escola (08:00 - 12:00)", "Almoço", "Descanso"] },
  { day: "Terça", activities: ["Escola (08:00 - 12:00)", "Almoço", "Futebol (16:00 - 17:00)"] },
  { day: "Quarta", activities: ["Escola (08:00 - 12:00)", "Almoço", "Descanso"] },
  { day: "Quinta", activities: ["Escola (08:00 - 12:00)", "Almoço", "Música (16:00 - 17:00)"] },
  { day: "Sexta", activities: ["Escola (08:00 - 12:00)", "Almoço", "Livre"] },
  { day: "Sábado", activities: ["Livre", "Visita avós (quinzenal)"] },
  { day: "Domingo", activities: ["Livre"] }
];
