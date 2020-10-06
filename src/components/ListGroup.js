import React from 'react'
import Select from 'react-select'
import Label from './Label'

export default ({ label, isRequired, options, value, onChange}) => 
    <div className="form-group">
        <Label text = {label} isRequired = {isRequired}/>
        <div><Select options = {options} value={value} onChange = {onChange}/></div>
    </div>