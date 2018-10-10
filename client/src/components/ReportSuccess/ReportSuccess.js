import React from 'react';
import { Typography, Button, withStyles } from '@material-ui/core';
import styles from './styles';
import { UserContext } from '../../context/UserProvider';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { DASHBOARD } from '../../routes/routes';

const ReportSuccess = ({
  classes,
  safesite,
  leftBtnClick,
  leftBtnTitle,
  history,
}) => {
  return (
    <UserContext.Consumer>
      {({ logout }) => {
        return (
          <div>
            <Typography>
              Thank you for helping us keep our work safe for everyone and
              creating this report thru Your ColdLogic portal. This report will
              be carefully investigated.
            </Typography>
            <Button
              variant="extendedFab"
              className={classes.button}
              color="primary"
              onClick={safesite ? () => logout() : () => leftBtnClick()}
            >
              {safesite ? 'Exit Coldlogic Portal' : leftBtnTitle}
            </Button>
            <Button
              variant="extendedFab"
              className={classes.button}
              color="secondary"
              onClick={() => history.push(DASHBOARD)}
            >
              Back To DashBoard
            </Button>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

ReportSuccess.propTypes = {
  classes: PropTypes.object.isRequired,
  safesite: PropTypes.bool,
  leftBtnTitle: PropTypes.string,
  leftBtnClick: PropTypes.func,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ReportSuccess));
