'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { mockPatients, mockDoctors } from '@/lib/mockData'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Calendar as CalendarIcon, Clock, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00'
]

const durations = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '1 heure' },
  { value: '90', label: '1h30' },
  { value: '120', label: '2 heures' }
]

export default function NewAppointmentPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    time: '',
    duration: '30',
    notes: '',
    status: 'scheduled'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const patients = mockPatients
  const doctors = mockDoctors

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !formData.patientId || !formData.doctorId || !formData.time) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsSubmitting(true)

    // Simuler la création du rendez-vous
    const newAppointment = {
      id: Date.now().toString(),
      patientId: formData.patientId,
      doctorId: formData.doctorId,
      dateTime: new Date(`${format(date, 'yyyy-MM-dd')}T${formData.time}:00`).toISOString(),
      duration: parseInt(formData.duration),
      status: formData.status as any,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    }

    // Dans une vraie application, on sauvegarderait en base de données
    console.log('Nouveau rendez-vous créé:', newAppointment)

    // Simuler un délai d'API
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Rendez-vous créé avec succès!')
      router.push('/appointments')
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const selectedPatient = patients.find(p => p.id === formData.patientId)
  const selectedDoctor = doctors.find(d => d.id === formData.doctorId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/appointments">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Rendez-vous</h1>
          <p className="text-gray-600 mt-1">
            Programmer un nouveau rendez-vous pour un patient
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations du rendez-vous */}
          <Card>
            <CardHeader>
              <CardTitle>Informations du Rendez-vous</CardTitle>
              <CardDescription>
                Sélectionnez le patient, le médecin et la date
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sélection du patient */}
              <div className="space-y-2">
                <Label htmlFor="patient">Patient *</Label>
                <Select value={formData.patientId} onValueChange={(value) => handleInputChange('patientId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.firstName} {patient.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPatient && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <p><strong>Email:</strong> {selectedPatient.email}</p>
                    <p><strong>Téléphone:</strong> {selectedPatient.phone}</p>
                  </div>
                )}
              </div>

              {/* Sélection du médecin */}
              <div className="space-y-2">
                <Label htmlFor="doctor">Médecin *</Label>
                <Select value={formData.doctorId} onValueChange={(value) => handleInputChange('doctorId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un médecin" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedDoctor && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <p><strong>Spécialité:</strong> {selectedDoctor.specialty}</p>
                    <p><strong>Email:</strong> {selectedDoctor.email}</p>
                  </div>
                )}
              </div>

              {/* Statut */}
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Programmé</SelectItem>
                    <SelectItem value="confirmed">Confirmé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Date et heure */}
          <Card>
            <CardHeader>
              <CardTitle>Date et Heure</CardTitle>
              <CardDescription>
                Choisissez la date et l'heure du rendez-vous
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sélection de la date */}
              <div className="space-y-2">
                <Label>Date du rendez-vous *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={fr}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Sélection de l'heure */}
              <div className="space-y-2">
                <Label htmlFor="time">Heure *</Label>
                <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une heure" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Durée */}
              <div className="space-y-2">
                <Label htmlFor="duration">Durée</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes et Observations</CardTitle>
            <CardDescription>
              Informations complémentaires sur le rendez-vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Motif de consultation, observations particulières..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Résumé */}
        {(selectedPatient || selectedDoctor || date || formData.time) && (
          <Card>
            <CardHeader>
              <CardTitle>Résumé du Rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {selectedPatient && (
                  <div>
                    <strong>Patient:</strong> {selectedPatient.firstName} {selectedPatient.lastName}
                  </div>
                )}
                {selectedDoctor && (
                  <div>
                    <strong>Médecin:</strong> {selectedDoctor.firstName} {selectedDoctor.lastName}
                  </div>
                )}
                {date && (
                  <div>
                    <strong>Date:</strong> {format(date, "EEEE d MMMM yyyy", { locale: fr })}
                  </div>
                )}
                {formData.time && (
                  <div>
                    <strong>Heure:</strong> {formData.time} ({formData.duration} min)
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/appointments">Annuler</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Création...' : 'Créer le Rendez-vous'}
          </Button>
        </div>
      </form>
    </div>
  )
}
