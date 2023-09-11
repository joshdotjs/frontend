import { useSnackbar } from 'notistack';

const useNotification = () => {

  const { enqueueSnackbar } = useSnackbar();

  const notify = ({ message, variant }) => () => {
    // variant: 'default' | 'error' | 'success' | 'warning' | 'info'
    enqueueSnackbar(message, { variant });
  };

  return [ notify ];
};

export { useNotification };