import React, { Fragment } from 'react';
import { withStyles, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';
import BestSiteForm from './BestSiteForm';
import Spinner from '../../components/UI/Spinner';
import ReportSuccess from '../../components/ReportSuccess';

const BestSite = ({ step, classes, nextStep, submitReport, loading }) => {
  let content;
  switch (step) {
    case 1:
      content = (
        <Fragment>
          <Typography>
            It's our responsibility to report any concern about safety, this
            helps us to keep our facilities safe and our work free of concerns
          </Typography>
          <Button
            variant="extendedFab"
            className={classes.button}
            color="secondary"
            onClick={() => nextStep.forward()}
          >
            Start My Report
          </Button>
        </Fragment>
      );

      break;
    case 2:
      content = <BestSiteForm submitReport={submitReport} />;

      break;

    default:
      content = (
        <ReportSuccess leftButton={{ title: 'hello', clicked: () => {} }} />
      );
      break;
  }
  return loading ? <Spinner size={40} color="secondary" /> : content;
};

BestSite.propTypes = {
  step: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.objectOf(PropTypes.func.isRequired),
  submitReport: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default withStyles(styles)(BestSite);
