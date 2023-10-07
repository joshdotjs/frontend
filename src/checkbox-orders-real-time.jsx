import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    console.log('checked: ', checked);
  }, [checked]);


  return (
    <FormGroup>
      <FormControlLabel 
        sx={{ color: 'black' }} 
        control={
          <Checkbox 
            checked={checked}
            onChange={handleChange}
          />
        } 
        label="Real Time"
      />
    </FormGroup>
  );
}