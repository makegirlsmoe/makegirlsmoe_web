import ButtonGroupSelector from './ButtonGroupSelector';

class BinarySelector extends ButtonGroupSelector {
    render() {
        return this.renderButtonGroup([
            {name: 'Off', value: -1},
            {name: 'Random', value: 0},
            {name: 'On', value: 1}
        ])
    }
}

export default BinarySelector;
