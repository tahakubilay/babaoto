'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Takvim</h1>
      <div className="flex gap-4 mb-4">
        <Button>Günlük</Button>
        <Button>Haftalık</Button>
        <Button>Aylık</Button>
        <Button>Yıllık</Button>
      </div>
      <div className="flex gap-4">
        <div className="w-3/4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
        <div className="w-1/4">
          <h2 className="text-xl font-bold mb-4">Notlar</h2>
          {/* Add your notes here */}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
