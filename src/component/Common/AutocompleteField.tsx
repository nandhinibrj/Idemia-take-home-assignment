import { Autocomplete, TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { FieldProps } from '../../utils/utils'

const AutocompleteField: React.FC<
  Omit<TextFieldProps, 'onChange'> & FieldProps<string | string[]> & { options: string[] }
> = ({ value, onChange, options, ...props }) => (
  <Autocomplete
    freeSolo
    autoSelect
    disableClearable
    multiple={typeof value === 'object' ? true : false}
    {...(typeof value === 'object' && { limitTags: 5 })}
    isOptionEqualToValue={() => false}
    options={options}
    value={value ?? ''}
    onChange={(_, newValue) => {
      onChange(newValue as string)
    }}
    renderInput={(params: any) => (
      <TextField
        variant="standard"
        {...params}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          'data-testid': props.label,
          ...params.InputProps,
        }}
        {...props}
      />
    )}
  />
)

export default React.memo(AutocompleteField)
