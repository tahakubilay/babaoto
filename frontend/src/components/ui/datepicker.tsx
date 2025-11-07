
"use client"

import * as React from "react"
import DatePicker, { ReactDatePickerProps } from "react-datepicker"
import { cn } from "@/lib/cn"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@/components/ui/input"

const CustomDatePicker = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof Input>
>((props, ref) => {
  return <Input {...props} ref={ref} />
})

CustomDatePicker.displayName = "CustomDatePicker"

const DatePickerComponent = ({ ...props }: ReactDatePickerProps) => {
  return (
    <DatePicker
      customInput={<CustomDatePicker />}
      {...props}
    />
  )
}

export { DatePickerComponent as DatePicker }
