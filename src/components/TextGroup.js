import React from 'react'
import Label from './Label'

export default ({label, isRequired}) => 
    <div className="form-group">
        <Label text = {label} isRequired = {isRequired}/>
        <div><input type="text" className="form-control" id="exampleInputPassword1" /></div>       
    </div> 