import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormikContext } from "formik";
import { IconButton } from "@mui/material";
import { Invoice } from "types";
import { useTheme } from "hooks";
import { InputNumericField } from "components/Inputs/inputNumericField";
import { InputTextField } from "components/Inputs/inputTextField";

interface ItemProps {
  id: number;
  remove: <T>(index: number) => T | undefined;
}

export const Item = ({ id, remove }: ItemProps) => {
  const { theme } = useTheme();
  const { values, setFieldValue } = useFormikContext<Invoice>();
  const { quantity, price } = values.items[id];

  useEffect(() => {
    const total = quantity * price;
    setFieldValue(`items.${id}.total`, total);
  }, [quantity, price, id, setFieldValue]);

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row">
      <InputTextField label={"Item Name"} id={`items.${id}.name`} />
      <InputNumericField label={"Qty."} id={`items.${id}.quantity`} />
      <InputNumericField label={"Price"} id={`items.${id}.price`} />
      <div className="grid grid-cols-8 gap-5">
        <div className="col-span-5 grid justify-start text-center text-skin-base sm:justify-center">
          <span>Total</span>
          <span className="font-bold">$ {values.items[id].total}</span>
        </div>
        <div className="center-end col-span-3">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => remove(id)}
            style={{ color: theme === "dark" ? "#7E88C3" : "" }}
          >
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
