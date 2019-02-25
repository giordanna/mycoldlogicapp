import React, { Component } from 'react';
import BestSiteForm from '../../components/Forms/BestSiteForm';
import SiteReportWelcomeScreen from '../../components/SiteReportWelcomeScreen';
import ReportSuccess from '../../components/ReportSuccess';
import MyBestSiteIcon from '../../assets/MyBestSiteIcon';
import TitleBar from '../../components/TitleBar';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { submitReport } from '../../lib/submitReport';
import { COLDLOGIC_TOKEN } from '../../config/tokens';
import { formatBestSiteReport } from '../../lib/formatReport';
import {
  BEST_SITE_REPORT_2,
  BEST_SITE_REPORT_3,
  BEST_SITE_REPORT,
  ERROR,
} from '../../routes/routes';
import PropTypes from 'prop-types';

class BestSitePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  _resetError = () => {
    this.setState({ error: false });
  };

  _submitReport = async report => {
    this.setState({ loading: true });
    try {
      const token = await localStorage.getItem(COLDLOGIC_TOKEN);
      const formattedResponse = await formatBestSiteReport(
        report,
        this.props.user,
      );
      const response = await submitReport(
        formattedResponse,
        '/BestSiteVms',
        token,
      );
      if (response.status === 201) {
        this.props.history.push(BEST_SITE_REPORT_3);
      } else {
        this.setState({ loading: false, error: true });
        this.props.history.push(ERROR, {
          from: BEST_SITE_REPORT,
          showButton: true,
        });
        return;
      }
    } catch (error) {
      this.setState({ error: true });
      this.props.history.push(ERROR, {
        from: BEST_SITE_REPORT,
        showButton: true,
      });
      return;
    }
    this.setState({ loading: false });
  };

  _showSitePage = route => {
    switch (route) {
      case BEST_SITE_REPORT_2:
        return (
          <BestSiteForm
            submitReport={this._submitReport}
            loading={this.state.loading}
            error={this.state.error}
            resetError={this._resetError}
          />
        );
      case BEST_SITE_REPORT_3:
        return (
          <ReportSuccess
            leftBtnTitle="Submit A New Report"
            leftBtnClick={() => this.props.history.push(BEST_SITE_REPORT)}
            message="Thank you for helping us improve your place of work submitting this Best Site Suggestion using the ColdLogic portal. This suggestion will be"
          />
        );
      default:
        return (
          <SiteReportWelcomeScreen
            firstParagraph="We would like to recognize and share your suggestions that improve our
          organization."
            secondParagraph="Please note that your user's full name will be taken so that we can
            acknowledge you and include you in discussions of your great idea!"
            buttonText="Start My Suggestion"
            clicked={() => this.props.history.push(BEST_SITE_REPORT_2)}
          />
        );
    }
  };
  render() {
    const { classes, match } = this.props;
    return (
      <Grid
        container
        justify="center"
        alignContent="flex-start"
        className={classes.bestSiteContainer}
      >
        <Grid item xs={12} md={8} className={classes.bestSiteTitle}>
          <TitleBar
            icon={<MyBestSiteIcon color={'#0D3C55'} />}
            title="My Best Site Suggestions"
          />
        </Grid>
        <Grid item xs={12} className={classes.bestSiteContent}>
          {this._showSitePage(match.path)}
        </Grid>
      </Grid>
    );
  }
}

BestSitePage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(BestSitePage);
