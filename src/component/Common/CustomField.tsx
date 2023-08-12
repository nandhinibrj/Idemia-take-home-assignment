import { MenuItem, TextField, TextFieldProps } from '@mui/material'
import { FieldProps, FIELD_PROPS } from '../../utils/utils'
import React from 'react'

const CustomField = <T extends string | number | null>({
  value,
  onChange,
  nullable,
  options,
  ...props
}: Omit<TextFieldProps, 'onChange'> &
  FieldProps<T> &
  (null extends T
    ? { nullable: true; options?: never }
    : { nullable?: false } & (number extends T
        ? { select?: false; options?: never }
        : string extends T
        ? { select?: false; options?: never }
        : { select?: true; options: readonly NonNullable<T>[] }))) => (
          
  <TextField
    {...FIELD_PROPS}
    {...(nullable && { placeholder: 'null' })}
    select={Boolean(options)}
    inputProps={{ sx: { textOverflow: 'ellipsis' } }}
    value={value ?? ''}
    required={!nullable && !options}
    onChange={
      nullable
        ? (event) => onChange((event.target.value || null) as T)
        : (event) => onChange(event.target.value as T)
    }
    {...props}
  >
    {options?.map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
)

export default CustomField
