'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datepicker';
import { Switch } from '@/components/ui/switch';

const ReceiptsPage = () => {
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'list'

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dekontlar</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-card rounded-lg">
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Şirket Seçin" />
          </SelectTrigger>
          <SelectContent>
            {/* Add your companies here */}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full md:w-[18_px]">
            <SelectValue placeholder="Marka Seçin" />
          </SelectTrigger>
          <SelectContent>
            {/* Add your brands here */}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Şube Seçin" />
          </SelectTrigger>
          <SelectContent>
            {/* Add your branches here */}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Kişi Seçin" />
          </SelectTrigger>
          <SelectContent>
            {/* Add your people here */}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Dekont Türü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="person">Kişi</SelectItem>
            <SelectItem value="branch">Şube</SelectItem>
          </SelectContent>
        </Select>

        <DatePicker
          placeholderText="Başlangıç Tarihi"
          className="w-full md:w-[180px]"
        />

        <DatePicker
          placeholderText="Bitiş Tarihi"
          className="w-full md:w-[180px]"
        />

        <Button>Filtrele</Button>
      </div>

      {/* View Switcher and Upload Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Switch
            id="view-mode"
            checked={viewMode === 'list'}
            onCheckedChange={() => setViewMode(viewMode === 'timeline' ? 'list' : 'timeline')}
          />
          <label htmlFor="view-mode">Liste Görünümü</label>
        </div>
        <Button>Dekont Yükle</Button>
      </div>

      {/* Content Area */}
      {viewMode === 'timeline' ? (
        <div>
          {/* Add your timeline view here */}
        </div>
      ) : (
        <div>
          {/* Add your list view here */}
        </div>
      )}
    </div>
  );
};

export default ReceiptsPage;
