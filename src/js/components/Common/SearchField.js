import React from 'react'
import { TextField } from '@material-ui/core';
export default function SearchField({handleChange, filter}) {
    return (
        <TextField
            fullWidth={true}
            id='filter'
            label='search...'
            value={filter}
            onChange={handleChange}
        />
    )
}
