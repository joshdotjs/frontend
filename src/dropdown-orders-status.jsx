import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicSelect() {
  const [age, setAge] = React.useState(2);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, }}>
      <FormControl variant='filled' fullWidth>
        <InputLabel id="dropdown-order-status-label" sx={{ color: 'white' }}>Status</InputLabel>
        <Select
          labelId="dropdown-order-status-label"
          id="dropdown-order-status"
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{ color: 'white' }}
        >
          <MenuItem value={1}>Pending</MenuItem>
          <MenuItem value={2}>Processing</MenuItem>
          <MenuItem value={3}>Ready</MenuItem>
          <MenuItem value={4}>Done</MenuItem>
          <MenuItem value={0}>Error</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}