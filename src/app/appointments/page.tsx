'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllAppointmentsWithDetails } from '@/lib/mockData'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'
import { Plus, Search, Filter, Edit, Trash2, Calendar, Clock } from 'lucide-react'

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
    case 'no-show':
      return 'bg-orange-100 text-orange-800'
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

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const appointments = getAllAppointmentsWithDetails()

  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter((appointment: any) => {
      const matchesSearch = 
        appointment.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
        case 'patient':
          return `${a.patient.lastName} ${a.patient.firstName}`.localeCompare(`${b.patient.lastName} ${b.patient.firstName}`)
        case 'doctor':
          return `${a.doctor.lastName} ${a.doctor.firstName}`.localeCompare(`${b.doctor.lastName} ${b.doctor.firstName}`)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const handleCancelAppointment = (appointmentId: string) => {
    console.log('Cancelling appointment:', appointmentId)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
          <p className="text-gray-600 mt-1">
            Gestion des rendez-vous programmés
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/appointments/new">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Rendez-vous
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{appointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Confirmés</p>
                <p className="text-2xl font-bold text-green-600">
                  {appointments.filter((a: any) => a.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Programmés</p>
                <p className="text-2xl font-bold text-blue-600">
                  {appointments.filter((a: any) => a.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-sm font-medium">Annulés</p>
                <p className="text-2xl font-bold text-red-600">
                  {appointments.filter((a: any) => a.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres et Recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par patient, médecin ou spécialité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="scheduled">Programmé</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="no-show">Absent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="doctor">Médecin</SelectItem>
                <SelectItem value="status">Statut</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Rendez-vous</CardTitle>
          <CardDescription>
            {filteredAppointments.length} rendez-vous trouvé{filteredAppointments.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date et Heure</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Aucun rendez-vous trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment: any) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {format(new Date(appointment.dateTime), 'EEEE d MMMM yyyy', { locale: fr })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {format(new Date(appointment.dateTime), 'HH:mm')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {appointment.patient.firstName} {appointment.patient.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.patient.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {appointment.doctor.firstName} {appointment.doctor.lastName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {appointment.doctor.specialty}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusLabel(appointment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {appointment.notes || '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            disabled={appointment.status === 'cancelled'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
