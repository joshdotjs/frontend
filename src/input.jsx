import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Password from './password';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

function CheckboxLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Admin?" />
      {/* <FormControlLabel required control={<Checkbox />} label="Required" /> */}
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
  );
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ValidationTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <CheckboxLabels />

      

      <div>
        <TextField
          // error
          id="email-text-field"
          label="Email"
          // defaultValue="Hello World"
          // helperText="Incorrect entry."
        />
        
        <Password />
      </div>
    </Box>
  );
}