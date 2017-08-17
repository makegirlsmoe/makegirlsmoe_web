import ButtonGroup from './ButtonGroup';

const DEFAULT_VALUE = 0;

class ButtonGroupSelector extends ButtonGroup {

    isButtonActive(value) {
        return (this.props.value || DEFAULT_VALUE) === value;
    }

    renderButtonGroup(options) {
        return super.renderButtonGroup(options.map(option => ({
            key: option.key,
            name: option.name,
            isActive: this.isButtonActive(option.value),
            onClick: () => this.props.onChange(option.value)
        })));
    }
}

export default ButtonGroupSelector;
