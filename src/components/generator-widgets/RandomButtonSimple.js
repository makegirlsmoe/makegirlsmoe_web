import ButtonGroup from './ButtonGroup';

class RandomButtonSimple extends ButtonGroup {

    render() {
        return super.renderButtonGroup([{
            key: 'random',
            name: 'Random',
            isActive: this.props.value === 1,
            onClick: () => this.props.onChange(1 - this.props.value)
        }]);
    }
}

export default RandomButtonSimple;
