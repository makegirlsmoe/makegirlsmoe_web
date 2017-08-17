import React from 'react';

import ButtonGroupSelector from './ButtonGroupSelector';

class RatingButtons extends ButtonGroupSelector {
    render() {
        return this.renderButtonGroup([
            {key: '+1', name: <span><span className="glyphicon glyphicon-thumbs-up"/><span>+1</span></span>, value: 1},
            {key: '-1', name: <span><span className="glyphicon glyphicon-thumbs-down"/><span>-1</span></span>, value: -1}
        ]);
    }
}

export default RatingButtons;
