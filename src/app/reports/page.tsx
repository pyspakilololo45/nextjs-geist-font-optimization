'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllAppointmentsWithDetails, mockPatients, mockDoctors } from '@/lib/mockData'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval } from 'date-fns'
import { fr } from 'date-fns/locale'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Calendar, Users, UserCheck, TrendingUp, Clock, CheckCircle } from 'lucide-react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function ReportsPage() {
  const appointments = getAllAppointmentsWithDetails()
  const patients = mockPatients
  const doctors = mockDoctors

  // Current month data
  const currentMonth = new Date()
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  
  const monthlyAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.dateTime)
    return isWithinInterval(appointmentDate, { start: monthStart, end: monthEnd })
  })

  // Statistics calculations
  const totalAppointments = appointments.length
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length
  const completedAppointments = appointments.filter(a => a.status === 'completed').length

  // Appointments by status
  const statusData = [
    { name: 'Confirmé', value: confirmedAppointments, color: '#00C49F' },
    { name: 'Programmé', value: appointments.filter(a => a.status === 'scheduled').length, color: '#0088FE' },
    { name: 'Annulé', value: cancelledAppointments, color: '#FF8042' },
    { name: 'Terminé', value: completedAppointments, color: '#8884D8' },
    { name: 'Absent', value: appointments.filter(a => a.status === 'no-show').length, color: '#FFBB28' }
  ]

  // Appointments by doctor
  const doctorData = doctors.map(doctor => ({
    name: `${doctor.firstName} ${doctor.lastName}`,
    specialty: doctor.specialty,
    appointments: appointments.filter(a => a.doctorId === doctor.id).length
  }))

  // Daily appointments for current month
  const dailyData = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(day => ({
    date: format(day, 'dd/MM'),
    appointments: appointments.filter(appointment => 
      format(new Date(appointment.dateTime), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    ).length
  }))

  // Appointments by specialty
  const specialtyData = doctors.reduce((acc: any[], doctor) => {
    const existing = acc.find(item => item.specialty === doctor.specialty)
    const appointmentCount = appointments.filter(a => a.doctorId === doctor.id).length
    
    if (existing) {
      existing.appointments += appointmentCount
    } else {
      acc.push({
        specialty: doctor.specialty,
        appointments: appointmentCount
      })
    }
    return acc
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rapports et Statistiques</h1>
        <p className="text-gray-600 mt-1">
          Analyse des données du cabinet médical - {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rendez-vous</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              {monthlyAppointments.length} ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">
              patients enregistrés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Médecins</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.length}</div>
            <p className="text-xs text-muted-foreground">
              praticiens actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de confirmation</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalAppointments > 0 ? Math.round((confirmedAppointments / totalAppointments) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              rendez-vous confirmés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Statut</CardTitle>
            <CardDescription>
              Distribution des rendez-vous selon leur statut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointments by Doctor */}
        <Card>
          <CardHeader>
            <CardTitle>Rendez-vous par Médecin</CardTitle>
            <CardDescription>
              Nombre de rendez-vous par praticien
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={doctorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => [
                    value, 
                    'Rendez-vous',
                    `Spécialité: ${props.payload.specialty}`
                  ]}
                />
                <Bar dataKey="appointments" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution Quotidienne</CardTitle>
            <CardDescription>
              Nombre de rendez-vous par jour ce mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#00C49F" 
                  strokeWidth={2}
                  dot={{ fill: '#00C49F' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointments by Specialty */}
        <Card>
          <CardHeader>
            <CardTitle>Rendez-vous par Spécialité</CardTitle>
            <CardDescription>
              Distribution par domaine médical
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={specialtyData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="specialty" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="appointments" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Mensuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rendez-vous programmés:</span>
              <span className="font-medium">{monthlyAppointments.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taux d'annulation:</span>
              <span className="font-medium text-red-600">
                {monthlyAppointments.length > 0 
                  ? Math.round((monthlyAppointments.filter(a => a.status === 'cancelled').length / monthlyAppointments.length) * 100)
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Moyenne par jour:</span>
              <span className="font-medium">
                {Math.round(monthlyAppointments.length / new Date().getDate())}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spécialités Actives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {specialtyData.map((specialty, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm text-gray-600">{specialty.specialty}:</span>
                <span className="font-medium">{specialty.appointments} RDV</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Indicateurs Clés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Patients par médecin:</span>
              <span className="font-medium">{Math.round(patients.length / doctors.length)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">RDV par patient:</span>
              <span className="font-medium">{Math.round(totalAppointments / patients.length)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Charge moyenne/médecin:</span>
              <span className="font-medium">{Math.round(totalAppointments / doctors.length)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
