'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockDoctors } from '@/lib/mockData'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'
import { Plus, Search, Edit, Calendar, Phone, UserCheck } from 'lucide-react'

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const doctors = mockDoctors

  // Filter doctors
  const filteredDoctors = doctors.filter((doctor: any) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      doctor.firstName.toLowerCase().includes(searchLower) ||
      doctor.lastName.toLowerCase().includes(searchLower) ||
      doctor.specialty.toLowerCase().includes(searchLower) ||
      doctor.email.toLowerCase().includes(searchLower) ||
      doctor.phone.includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Médecins</h1>
          <p className="text-gray-600 mt-1">
            Équipe médicale et spécialistes
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/doctors/new">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Médecin
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{doctors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Spécialités</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Set(doctors.map((d: any) => d.specialty)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par nom, spécialité, email ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Médecins</CardTitle>
          <CardDescription>
            {filteredDoctors.length} médecin{filteredDoctors.length !== 1 ? 's' : ''} trouvé{filteredDoctors.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom et Prénom</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Horaires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Aucun médecin trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDoctors.map((doctor: any) => (
                    <TableRow key={doctor.id}>
                      <TableCell>
                        <div className="font-medium">
                          {doctor.firstName} {doctor.lastName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doctor.specialty}</Badge>
                      </TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell>{doctor.phone}</TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {doctor.schedule.map((s: any, index: number) => (
                            <div key={index}>
                              {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][s.dayOfWeek]}: {s.startTime}-{s.endTime}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4" />
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
