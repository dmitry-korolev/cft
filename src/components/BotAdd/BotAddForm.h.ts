interface Option {
  value: string
  label?: string
}

export interface BotAddFormProps {
  owners: Option[]
  onSubmit: () => void
}
