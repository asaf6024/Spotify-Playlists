import React from 'react';
import './dropdown.css'
const Dropdown = props => {

    const dropdownChanged = e => {

        if (props.setDisabled !== undefined) {
            props.setCount !== undefined && props.setCount(10)
            e.target.value === 'Select...' ? props.setDisabled('disabled') : props.setDisabled('')
        }

        e.target.value !== 'Select...' && props.changed(e.target.value);

    }

    return (
        <div className="col-lg-6 col-md-12 form-group row px-0 ">
            <label className="form-label col-sm-2">{props.label}</label>

            <select value={props.selectedValue}
                onChange={dropdownChanged}
                className="form-control form-control-sm col-sm-10">
                <option key={0}>Select...</option>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
            </select>

        </div>
    );
}

export default Dropdown;