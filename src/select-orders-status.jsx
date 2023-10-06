import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// ==============================================

const names = [
  'Pending',
  'Preparing',
  'Ready',
  'Done',
  'Error',
];

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = React.useState(['Preparing', 'Ready']);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

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
          {names.map((name) => (
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