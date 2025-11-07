'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datepicker';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApi } from '@/hooks/useApi';
import { Company, Brand, Branch, Person } from '@/types';

const ReportsPage = () => {
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const [newReport, setNewReport] = useState({ description: '', report_type: '', start_date: null, end_date: null });

  const handleCreateReport = async () => {
    try {
      await api.post('/reports/', newReport);
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  const { data: companies, loading: companiesLoading, error: companiesError } = useApi<Company[]>('/core/companies/');
  const { data: brands, loading: brandsLoading, error: brandsError } = useApi<Brand[]>(selectedCompany ? `/core/brands/?company=${selectedCompany}` : null);
  const { data: branches, loading: branchesLoading, error: branchesError } = useApi<Branch[]>(selectedBrand ? `/core/branches/?brand=${selectedBrand}` : null);
  const { data: people, loading: peopleLoading, error: peopleError } = useApi<Person[]>(selectedBranch ? `/core/people/?branch=${selectedBranch}` : null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [reportType, setReportType] = useState<string | null>(null);

  const { data: reportsData, loading: reportsLoading, error: reportsError, refetch } = useApi<any[]>(
    `/reports/?company=${selectedCompany || ''}&brand=${selectedBrand || ''}&branch=${selectedBranch || ''}&person=${selectedPerson || ''}&type=${reportType || ''}&start_date=${startDate?.toISOString() || ''}&end_date=${endDate?.toISOString() || ''}`
  );

  useEffect(() => {
    if (reportsData) {
      setReports(reportsData);
    }
  }, [reportsData]);

  if (companiesError || brandsError || branchesError || peopleError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Raporlar</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-card rounded-lg">
        <Select onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Şirket Seçin" />
          </SelectTrigger>
          <SelectContent>
            {companiesLoading ? <SelectItem value="loading" disabled>Yükleniyor...</SelectItem> : companies?.map((company) => (
              <SelectItem key={company.id} value={company.id.toString()}>{company.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedBrand}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Marka Seçin" />
          </SelectTrigger>
          <SelectContent>
            {brandsLoading ? <SelectItem value="loading" disabled>Yükleniyor...</SelectItem> : brands?.map((brand) => (
              <SelectItem key={brand.id} value={brand.id.toString()}>{brand.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Şube Seçin" />
          </SelectTrigger>
          <SelectContent>
            {branchesLoading ? <SelectItem value="loading" disabled>Yükleniyor...</SelectItem> : branches?.map((branch) => (
              <SelectItem key={branch.id} value={branch.id.toString()}>{branch.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedPerson}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Kişi Seçin" />
          </SelectTrigger>
          <SelectContent>
            {peopleLoading ? <SelectItem value="loading" disabled>Yükleniyor...</SelectItem> : people?.map((person) => (
              <SelectItem key={person.id} value={person.id.toString()}>{person.first_name} {person.last_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Başlangıç Tarihi"
          className="w-full md:w-[180px]"
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Bitiş Tarihi"
          className="w-full md:w-[180px]"
        />

        <Select onValueChange={setReportType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Rapor Türü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="financial">Finansal</SelectItem>
            <SelectItem value="payment">Ödeme</SelectItem>
            <SelectItem value="performance">Performans</SelectItem>
            <SelectItem value="general">Genel</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={refetch}>Filtrele</Button>
      </div>

      {/* View Switcher and Create Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Switch
            id="view-mode"
            checked={viewMode === 'table'}
            onCheckedChange={() => setViewMode(viewMode === 'card' ? 'table' : 'card')}
          />
          <label htmlFor="view-mode">Tablo Görünümü</label>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Yeni Rapor Oluştur</Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-card p-8 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Yeni Rapor Oluştur</h2>
            <div className="grid grid-cols-1 gap-4">
              <Select onValueChange={(value) => setNewReport({ ...newReport, report_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Rapor Türü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Finansal</SelectItem>
                  <SelectItem value="payment">Ödeme</SelectItem>
                  <SelectItem value="performance">Performans</SelectItem>
                  <SelectItem value="general">Genel</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <DatePicker
                  selected={newReport.start_date}
                  onChange={(date) => setNewReport({ ...newReport, start_date: date })}
                  selectsStart
                  startDate={newReport.start_date}
                  endDate={newReport.end_date}
                  placeholderText="Başlangıç Tarihi"
                  className="w-full"
                />
                <DatePicker
                  selected={newReport.end_date}
                  onChange={(date) => setNewReport({ ...newReport, end_date: date })}
                  selectsEnd
                  startDate={newReport.start_date}
                  endDate={newReport.end_date}
                  minDate={newReport.start_date}
                  placeholderText="Bitiş Tarihi"
                  className="w-full"
                />
              </div>
              <textarea
                placeholder="Açıklama"
                className="w-full p-2 border rounded"
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>İptal</Button>
              <Button onClick={handleCreateReport}>Rapor Oluştur</Button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      {viewMode === 'card' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>{report.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Rapor Türü: {report.type}</p>
                <p>Tarih: {report.created_at}</p>
                <p>Oluşturan: {report.created_by}</p>
                <p>Toplam Tutar: {report.total_amount}</p>
                <p>Durum: {report.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rapor Adı</TableHead>
              <TableHead>Rapor Türü</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Oluşturan</TableHead>
              <TableHead>Toplam Tutar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Aksiyonlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.created_at}</TableCell>
                <TableCell>{report.created_by}</TableCell>
                <TableCell>{report.total_amount}</TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell>...</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ReportsPage;