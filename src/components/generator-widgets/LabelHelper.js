import React from 'react';
import { injectIntl, intlShape } from "react-intl";

const LabelHelper = ({mesg, intl}) => (
    <span className="glyphicon glyphicon-question-sign" data-rh={intl.formatMessage({id:mesg})}>
    </span>
);

LabelHelper.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(LabelHelper);
