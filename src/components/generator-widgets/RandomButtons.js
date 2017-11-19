import ButtonGroupSelector from './ButtonGroupSelector';

class RandomButtons extends ButtonGroupSelector {
    render() {
        return this.renderButtonGroup([
            {key: 'random', name: 'Random', value: 1},
            {key: 'fixed', name: 'Fixed', value: 0}
        ]);
    }
}

export default RandomButtons;
