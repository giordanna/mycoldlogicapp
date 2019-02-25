import React, { Component } from 'react';
import TitleBar from '../../components/TitleBar';
import ReportSuccess from '../../components/ReportSuccess';
import SafeSiteIcon from '../../assets/SafeSiteIcon';
import SafeSiteForm from '../../components/Forms/SafeSiteForm';
import SiteReportWelcomeScreen from '../../components/SiteReportWelcomeScreen';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { submitReport } from '../../lib/submitReport';
import { formatSafetyReport } from '../../lib/formatReport';
import { COLDLOGIC_TOKEN } from '../../config/tokens';
import {
  SAFE_SITE_REPORT_2,
  SAFE_SITE_REPORT_3,
  SAFE_SITE_REPORT,
  ERROR,
} from '../../routes/routes';
import PropTypes from 'prop-types';
import LoadContent from '../../hoc/LoadContent';
import LoadingScreen from '../../components/UI/LoadingScreen';

class SafeSitePage extends Component {
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
  _showSitePage = (route, data) => {
    switch (route) {
      case SAFE_SITE_REPORT_2:
        return (
          <SafeSiteForm
            submitReport={this._submitReport}
            loading={this.state.loading}
            error={this.state.error}
            errorReset={this._resetError}
            distCenters={data}
          />
        );
      case SAFE_SITE_REPORT_3:
        return (
          <ReportSuccess
            leftBtnTitle="Submit New Report"
            leftBtnClick={() => this.props.history.push(SAFE_SITE_REPORT)}
            message="Thank you for helping us improve your place of work submitting this Best Site Suggestion using the ColdLogic portal. This suggestion will be"
          />
        );

      default:
        return (
          <SiteReportWelcomeScreen
            firstParagraph="It's our responsibility to report any concern about safety, this
            helps us to keep our facilities safe and our work free of concerns."
            buttonText="Start My Report"
            clicked={() => this.props.history.push(SAFE_SITE_REPORT_2)}
          />
        );
    }
  };

  _submitReport = async report => {
    this.setState({ loading: true });
    try {
      const token = await localStorage.getItem(COLDLOGIC_TOKEN);
      const formattedReport = await formatSafetyReport(report, this.props.user);
      const response = await submitReport(
        formattedReport,
        '/SafeSiteVms',
        token,
      );
      if (response.status === 201) {
        this.props.history.push(SAFE_SITE_REPORT_3);
      } else {
        this.props.history.push(ERROR, { from: SAFE_SITE_REPORT });
      }
      return true;
    } catch (error) {
      this.props.history.push(ERROR, { from: SAFE_SITE_REPORT });
    }
    this.setState({ loading: false });
  };

  render() {
    const { classes, match } = this.props;
    return (
      <LoadContent url="/DistCenters">
        {({ error, loading, data }) => {
          if (loading) return <LoadingScreen />;
          if (error) return <p>error</p>;
          return (
            <Grid
              container
              justify="center"
              alignContent="flex-start"
              className={classes.safeSiteContainer}
            >
              <Grid item xs={12} md={8} className={classes.safeSiteTitle}>
                <TitleBar
                  icon={<SafeSiteIcon color={'#0D3C55'} />}
                  title="Safe Site Report"
                />
              </Grid>
              <Grid item xs={12} sm={8} className={classes.safeSiteContent}>
                {this._showSitePage(match.path, data)}
              </Grid>
            </Grid>
          );
        }}
      </LoadContent>
    );
  }
}

SafeSitePage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(SafeSitePage);
