import ButtonGroupSelector from './ButtonGroupSelector';

class NoiseSelector extends ButtonGroupSelector {
    render() {
        return this.renderButtonGroup([
            {name: 'Random', value: 0},
            {name: 'Fixed', value: 1}
        ])
    }
}

export default NoiseSelector;
