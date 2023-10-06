const int2status = (int) => {
  const statuses = ['Error', 'Pending', 'Preparing', 'Ready', 'Done'];
  return statuses[int];
};

export { int2status };