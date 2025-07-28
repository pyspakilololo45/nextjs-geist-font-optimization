export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  medicalHistory: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
  schedule: DoctorSchedule[];
  createdAt: string;
}

export interface DoctorSchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string; // "17:00"
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: string;
  duration: number; // in minutes
  status: AppointmentStatus;
  notes: string;
  createdAt: string;
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';

export interface AppointmentWithDetails extends Appointment {
  patient: Patient;
  doctor: Doctor;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  todayAppointments: number;
  thisWeekAppointments: number;
  thisMonthAppointments: number;
}
