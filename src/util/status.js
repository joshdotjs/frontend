// ==============================================

const int2status = (int) => {
  const statuses = ['Error', 'Pending', 'Preparing', 'Ready', 'Done'];
  return statuses[int];
};

// ==============================================

const statusInt2Color = (int) => {
  const statuses = ['error', 'secondary', 'warning', 'info', 'success', 'primary',  ];
  return statuses[int];
};

// ==============================================

export { int2status, statusInt2Color };