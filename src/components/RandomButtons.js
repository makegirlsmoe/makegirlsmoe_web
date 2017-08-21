import React from 'react';
import ButtonGroupSelector from './ButtonGroupSelector';

class RandomButtons extends ButtonGroupSelector {
    render() {
        return this.renderButtonGroup([
            {key: 'random', name: <span>Random</span>, value: 1},
            {key: 'fixed', name: <span>Fixed</span>, value: 0}
        ]);
    }
}

export default RandomButtons;
