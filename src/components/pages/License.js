import React, { Component } from 'react';
import Config from '../../Config';
import { FormattedMessage } from 'react-intl';

class License extends Component {
    render() {
        return (
            <div className="license">
                <h3 style={{color: Config.colors.theme}}><FormattedMessage id='LicensePageTitle' /></h3>
                <p><FormattedMessage id='LicenseLine1' /></p>
                <p><FormattedMessage id='LicenseLine2Start' /><a href="https://github.com/makegirlsmoe/makegirlsmoe_web/blob/master/LICENSE.txt"><FormattedMessage id='LicenseLine2Link' /></a><FormattedMessage id='LicenseLine2Middle' /><a href="mailto:yanghuajin94@gmail.com" target="_blank" rel="noopener noreferrer"><FormattedMessage id='LicenseLine2EmailLink' /></a><FormattedMessage id='LicenseLine2End' /></p>
                <p><FormattedMessage id='LicenseLine3' /></p>
                <p><FormattedMessage id='LicenseLine4' /></p>
            </div>
        );
    }
}

export default License;
