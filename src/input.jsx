import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Password from './password';
import Button from '@mui/material/Button';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const FC = ({ children }) => (
  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
    {children}
  </FormControl>
);

// ==============================================

export default function ValidationTextFields() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      
      <div style={{ border: 'solid black 1px', width: 'fit-content', margin: '0 auto'}}>

        {/* =========================================  */}

        <div>
          <FC>
            <TextField
              // error
              id="email-text-field"
              label="Email"
              // defaultValue="Hello World"
              // helperText="Incorrect entry."
            />
          </FC>

          <FC>
            <Password />
          </FC>
        </div>

        {/* =========================================  */}

        <div>
          <FC>
            <FormControlLabel control={
              <Checkbox defaultChecked />
            } label="Admin?" />
          </FC>

          <FC>
            <Button variant="contained">Create</Button>
          </FC>
        </div>
      

        {/* =========================================  */}

      </div>

    </Box>
  );
}