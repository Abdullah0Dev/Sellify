import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { usePreviewUpdater } from "../../context/UpdateContext";
import type React from "react";

type ItemValue = {
  value: string;
}
type SelectMenuType = {
  placeholder: string;
  selectLabel: string;
  items: ItemValue[]
  onChange?: (val: string) => void;
}
const SelectMenu: React.FC<SelectMenuType> = ({ placeholder, selectLabel, items, onChange }) => {
  const { form } = usePreviewUpdater()

  return (
    // only call on change if defined
    <Select defaultValue={form.category} onValueChange={(val) => onChange?.(val)}>
      <SelectTrigger className="w-full ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent><SelectGroup>
        <SelectLabel>{selectLabel}</SelectLabel>
        {items.map((itm) => (
          <SelectItem key={itm.value} value={itm.value}>{itm.value}</SelectItem>
        ))}
      </SelectGroup>
      </SelectContent>
    </Select>
  )
}


export default SelectMenu;
