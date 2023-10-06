import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicTimePicker({time, update, which}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker value={time} onChange={(newTime) => update({ which, new_date_time: newTime })} />
      </DemoContainer>
    </LocalizationProvider>
  );
}