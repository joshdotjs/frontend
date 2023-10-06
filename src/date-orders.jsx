import * as React from 'react';
import dayjs from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ControlledComponent() {
  // const [value, setValue] = React.useState(dayjs('2023-10-05'));
  const [value, setValue] = React.useState(dayjs());

  // const x = dayjs.utc().second(30).valueOf()// => new Date().setUTCSeconds(30)
  

  React.useEffect(() => {
    // console.log('value: ', value);
    // console.dir(value);
    // console.log('value.format(): ', value.format());
    console.log('value.day(): ', value.day());
    console.log('value.date(): ', value.date());
    console.log('value.month(): ', value.month());
    console.log('value.year(): ', value.year());
    console.log('value.hour(): ', value.hour());
    console.log('value.minute(): ', value.minute());
    console.log('value.second(): ', value.second());
    console.log('value.millisecond(): ', value.millisecond());
    console.log('value.unix(): ', value.unix());
    console.log('value.valueOf(): ', value.valueOf());
    console.log('value.toISOString(): ', value.toISOString());
    console.log('value.toDate(): ', value.toDate());
    console.log('value.toString(): ', value.toString());
    console.log('value.toJSON(): ', value.toJSON());
    console.log('value.format(): ', value.format());
    console.log('value.format("YYYY-MM-DD"): ', value.format('YYYY-MM-DD'));
    console.log('value.format("YYYY-MM-DD HH:mm:ss"): ', value.format('YYYY-MM-DD HH:mm:ss'));
    console.log('value.format("YYYY-MM-DD HH:mm:ss.SSS"): ', value.format('YYYY-MM-DD HH:mm:ss.SSS'));
    console.log('value.format("YYYY-MM-DD HH:mm:ss.SSS Z"): ', value.format('YYYY-MM-DD HH:mm:ss.SSS Z'));
  

  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}