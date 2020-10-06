import React from 'react'

export default ({text, isRequired}) =>
<label>{text}{isRequired && <span className='asterik'>*</span>}</label>