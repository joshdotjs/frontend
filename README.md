git commit --amend -m "message..."


Fix bug: "TypeError: styled_default is not a function"
npm cache clean --force
Delete node_modules/.vite Cache: https://github.com/mui/material-ui/issues/32727#issuecomment-1705737899
-ultimately, commenting out of the theme provider in _index.js solved the problem (and also deleting node_modules and re-installing)