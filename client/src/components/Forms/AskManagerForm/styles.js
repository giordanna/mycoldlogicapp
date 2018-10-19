const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 5,
    display: 'flex',
    justifyContent: 'center',
  },
  formControl: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
    fontSize: '1.6rem',

    '& > *': {
      fontSize: 'inherit',
      '& > *': {
        fontSize: 'inherit',
      },
    },
  },
  selectItem: {
    fontSize: '1.6rem',
  },
});

export default styles;
