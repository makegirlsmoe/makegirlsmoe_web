import Utils from '../../utils/Utils';
import Dropdown from './Dropdown';

const DEFAULT_VALUE = 0;

class MultipleSelector extends Dropdown {

    constructor(props) {
        super(props);
        this.options = ['random'].concat(props.options);
    }

    componentWillReceiveProps(newProps) {
        this.options = ['random'].concat(newProps.options);
    }

    onOptionClick(index) {
        this.props.onChange(index);
    }

    getValue() {
        return Utils.keyToString(this.options[this.props.value || DEFAULT_VALUE]);
    }
}

export default MultipleSelector;
