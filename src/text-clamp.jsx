import Typography from '@mui/material/Typography';

export default function Clamp({ children, lines }) {
  return (
    <Typography variant="body1" color="text.secondary"
      sx={{ // clamp text to 3 lines
        // display: 'block',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineHeight: '1.2em',  // Line height
        maxHeight: `${lines * 1.2}em`,   // Max height = lineHeight * number of lines
        WebkitLineClamp: lines, // Number of lines to display
        textOverflow: 'ellipsis',
      }}
    >
      { children }
    </Typography>
  );
};