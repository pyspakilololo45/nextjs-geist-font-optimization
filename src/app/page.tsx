'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllAppointmentsWithDetails } from '@/lib/mockData'
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'
import { Plus, Calendar as CalendarIcon, Users, UserCheck, Clock } from 'lucide-react'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'scheduled':
      return 'bg-blue-100 text-blue-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'completed':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmé'
    case 'scheduled':
      return 'Programmé'
    case 'cancelled':
      return 'Annulé'
    case 'completed':
      return 'Terminé'
    case 'no-show':
      return 'Absent'
    default:
      return status
  }
}

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const appointments = getAllAppointmentsWithDetails()

  // Get appointments for selected date
  const selectedDateAppointments = appointments.filter(appointment =>
    isSameDay(new Date(appointment.dateTime), selectedDate)
  )

  // Get appointments for current month
  const currentMonth = new Date()
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.dateTime)
    return appointmentDate >= monthStart && appointmentDate <= monthEnd
  })

  // Calculate stats
  const todayAppointments = appointments.filter(appointment =>
    isSameDay(new Date(appointment.dateTime), new Date())
  )

  const confirmedAppointments = monthAppointments.filter(a => a.status === 'confirmed')
  const scheduledAppointments = monthAppointments.filter(a => a.status === 'scheduled')

  // Get days with appointments for calendar highlighting
  const daysWithAppointments = appointments.map(appointment => 
    new Date(appointment.dateTime)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600 mt-1">
            Gestion des rendez-vous - {format(new Date(), 'EEEE d MMMM yyyy', { locale: fr })}
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/appointments/new">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Rendez-vous
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              rendez-vous programmés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              total des rendez-vous
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmés</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmedAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              rendez-vous confirmés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{scheduledAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              à confirmer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendrier des Rendez-vous</CardTitle>
            <CardDescription>
              Cliquez sur une date pour voir les rendez-vous programmés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              locale={fr}
              className="rounded-md border"
              modifiers={{
                hasAppointments: daysWithAppointments
              }}
              modifiersStyles={{
                hasAppointments: {
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontWeight: 'bold'
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Selected Date Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>
              {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
            </CardTitle>
            <CardDescription>
              {selectedDateAppointments.length} rendez-vous programmé{selectedDateAppointments.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDateAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun rendez-vous programmé</p>
                  <Button asChild className="mt-4" variant="outline" size="sm">
                    <Link href="/appointments/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un RDV
                    </Link>
                  </Button>
                </div>
              ) : (
                selectedDateAppointments
                  .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {format(new Date(appointment.dateTime), 'HH:mm')}
                          </span>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-900">
                          {appointment.patient.firstName} {appointment.patient.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appointment.doctor.firstName} {appointment.doctor.lastName} - {appointment.doctor.specialty}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/appointments">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Gérer les Rendez-vous</h3>
                  <p className="text-sm text-gray-600">Voir tous les rendez-vous</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/patients">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Patients</h3>
                  <p className="text-sm text-gray-600">Gérer les dossiers patients</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/doctors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Équipe Médicale</h3>
                  <p className="text-sm text-gray-600">Gérer les médecins</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}
