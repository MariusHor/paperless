import { FieldArray, useFormikContext } from "formik";
import { Item } from "./Item";
import { Invoice, InvoiceItem } from "types";
import { Button } from "components";

export const ItemList = () => {
  const { values } = useFormikContext<Invoice>();
  const emptyItem: InvoiceItem = { name: "", quantity: 0, price: 0, total: 0 };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="heading-sm text-primary-600">Item List</h1>

      <FieldArray name="items">
        {({ push, remove }) => (
          <div className="flex flex-col gap-6">
            {values.items.map((_, index) => (
              <div className="flex flex-col gap-10" key={index}>
                <Item id={index} remove={remove} />
              </div>
            ))}

            <Button
              intent="primary"
              size="medium"
              onClick={() => push(emptyItem)}
            >
              Add new item
            </Button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};