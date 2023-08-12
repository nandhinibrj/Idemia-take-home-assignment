export const FIELD_PROPS = {
  size: 'small',
  variant: 'standard',
  InputLabelProps: { shrink: true },
} as const

export type FieldProps<T> = {
  value?: T;
  onChange: (newValue: T) => void
  endAdornment?: React.ReactNode
  helperText?: React.ReactNode
}

