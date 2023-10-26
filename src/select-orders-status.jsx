// libs:
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// utils:
import { all_statuses, ints2statuses, statuses2ints } from './util/status';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function MultipleSelectCheckmarks({ status, update }) {
  const [personName, setPersonName] = React.useState(ints2statuses(status));

  const handleChange = (event) => {
    const value = event.target.value;
    console.log('value: ', value);
    console.log('statuses2Ints(value): ', statuses2ints(value));
    update( statuses2ints(value) );

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="orders-status-multiple-checkbox-label">Status</InputLabel>
        <Select
          labelId="orders-status-multiple-checkbox-label"
          id="orders-status-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {all_statuses.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}