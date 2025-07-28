import { Patient, Doctor, Appointment, AppointmentStatus } from './types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@email.com',
    phone: '01 23 45 67 89',
    address: '15 rue de la Paix, 75001 Paris',
    dateOfBirth: '1985-03-15',
    medicalHistory: 'Hypertension, allergies aux antibiotiques',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'pierre.martin@email.com',
    phone: '01 34 56 78 90',
    address: '28 avenue des Champs, 75008 Paris',
    dateOfBirth: '1978-07-22',
    medicalHistory: 'Diabète type 2, antécédents cardiaques',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Leroy',
    email: 'sophie.leroy@email.com',
    phone: '01 45 67 89 01',
    address: '42 boulevard Saint-Germain, 75005 Paris',
    dateOfBirth: '1992-11-08',
    medicalHistory: 'Asthme léger, aucune allergie connue',
    createdAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '4',
    firstName: 'Jean',
    lastName: 'Moreau',
    email: 'jean.moreau@email.com',
    phone: '01 56 78 90 12',
    address: '7 place de la République, 75011 Paris',
    dateOfBirth: '1965-05-30',
    medicalHistory: 'Arthrose, traitement anti-inflammatoire',
    createdAt: '2024-02-10T16:45:00Z'
  },
  {
    id: '5',
    firstName: 'Isabelle',
    lastName: 'Rousseau',
    email: 'isabelle.rousseau@email.com',
    phone: '01 67 89 01 23',
    address: '33 rue du Faubourg, 75012 Paris',
    dateOfBirth: '1988-12-03',
    medicalHistory: 'Migraine chronique, contraception orale',
    createdAt: '2024-02-15T11:20:00Z'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    firstName: 'Dr. Antoine',
    lastName: 'Lefebvre',
    specialty: 'Médecine Générale',
    email: 'a.lefebvre@cabinet.com',
    phone: '01 42 33 44 55',
    schedule: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 2, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 3, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 5, startTime: '08:00', endTime: '16:00' }
    ],
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: '2',
    firstName: 'Dr. Catherine',
    lastName: 'Bernard',
    specialty: 'Cardiologie',
    email: 'c.bernard@cabinet.com',
    phone: '01 42 33 44 56',
    schedule: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '17:00' }
    ],
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: '3',
    firstName: 'Dr. Michel',
    lastName: 'Durand',
    specialty: 'Dermatologie',
    email: 'm.durand@cabinet.com',
    phone: '01 42 33 44 57',
    schedule: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 3, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 5, startTime: '10:00', endTime: '18:00' }
    ],
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: '4',
    firstName: 'Dr. Sylvie',
    lastName: 'Petit',
    specialty: 'Pédiatrie',
    email: 's.petit@cabinet.com',
    phone: '01 42 33 44 58',
    schedule: [
      { dayOfWeek: 1, startTime: '08:30', endTime: '17:30' },
      { dayOfWeek: 2, startTime: '08:30', endTime: '17:30' },
      { dayOfWeek: 3, startTime: '08:30', endTime: '17:30' },
      { dayOfWeek: 4, startTime: '08:30', endTime: '17:30' }
    ],
    createdAt: '2024-01-01T08:00:00Z'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    dateTime: '2024-12-20T09:00:00Z',
    duration: 30,
    status: 'confirmed' as AppointmentStatus,
    notes: 'Consultation de routine',
    createdAt: '2024-12-15T10:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    dateTime: '2024-12-20T14:30:00Z',
    duration: 45,
    status: 'scheduled' as AppointmentStatus,
    notes: 'Suivi cardiologique',
    createdAt: '2024-12-15T11:00:00Z'
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '1',
    dateTime: '2024-12-21T10:15:00Z',
    duration: 30,
    status: 'confirmed' as AppointmentStatus,
    notes: 'Renouvellement ordonnance',
    createdAt: '2024-12-16T09:00:00Z'
  },
  {
    id: '4',
    patientId: '4',
    doctorId: '3',
    dateTime: '2024-12-21T15:00:00Z',
    duration: 30,
    status: 'scheduled' as AppointmentStatus,
    notes: 'Consultation dermatologique',
    createdAt: '2024-12-16T14:00:00Z'
  },
  {
    id: '5',
    patientId: '5',
    doctorId: '1',
    dateTime: '2024-12-22T11:30:00Z',
    duration: 30,
    status: 'confirmed' as AppointmentStatus,
    notes: 'Suivi migraine',
    createdAt: '2024-12-17T08:30:00Z'
  },
  {
    id: '6',
    patientId: '1',
    doctorId: '2',
    dateTime: '2024-12-23T09:45:00Z',
    duration: 45,
    status: 'scheduled' as AppointmentStatus,
    notes: 'Contrôle tension artérielle',
    createdAt: '2024-12-17T15:00:00Z'
  },
  {
    id: '7',
    patientId: '3',
    doctorId: '4',
    dateTime: '2024-12-24T10:00:00Z',
    duration: 30,
    status: 'cancelled' as AppointmentStatus,
    notes: 'Consultation pédiatrique - annulée par patient',
    createdAt: '2024-12-18T12:00:00Z'
  }
];

// Helper functions to get data with relationships
export const getAppointmentWithDetails = (appointmentId: string) => {
  const appointment = mockAppointments.find(a => a.id === appointmentId);
  if (!appointment) return null;

  const patient = mockPatients.find(p => p.id === appointment.patientId);
  const doctor = mockDoctors.find(d => d.id === appointment.doctorId);

  if (!patient || !doctor) return null;

  return {
    ...appointment,
    patient,
    doctor
  };
};

export const getAllAppointmentsWithDetails = () => {
  return mockAppointments.map(appointment => {
    const patient = mockPatients.find(p => p.id === appointment.patientId);
    const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
    
    return {
      ...appointment,
      patient: patient!,
      doctor: doctor!
    };
  }).filter(appointment => appointment.patient && appointment.doctor);
};

export const getPatientAppointments = (patientId: string) => {
  return mockAppointments
    .filter(a => a.patientId === patientId)
    .map(appointment => {
      const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
      return {
        ...appointment,
        doctor: doctor!
      };
    });
};

export const getDoctorAppointments = (doctorId: string) => {
  return mockAppointments
    .filter(a => a.doctorId === doctorId)
    .map(appointment => {
      const patient = mockPatients.find(p => p.id === appointment.patientId);
      return {
        ...appointment,
        patient: patient!
      };
    });
};
