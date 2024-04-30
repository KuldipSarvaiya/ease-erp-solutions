import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";

function InputCon({ controller, input }) {
  return (
    <Controller
      name={controller.name}
      control={controller.control}
      rules={controller?.rules}
      // defaultValue={controller.value || ""}
      render={({ field }) => (
        <>
          <Input
            hidden={input.hidden || false}
            defaultValue={input.defaultValue || ""}
            type={input.type || "text"}
            label={input.label || ""}
            radius={input.radius || "sm"}
            size={input.size || "sm"}
            labelPlacement={input.labelPlacement || "outside"}
            variant={input.variant || "faded"}
            color={input.color || "secondary"}
            name={input.name}
            placeholder={input.placeholder || ""}
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              // handleChange(e);
              // onChanged(e);
            }}
            isRequired={input.isRequired || false}
            isDisabled={input.disabled || false}
            className={input.className || ""}
            aria-label={input.name}
            startContent={input.startContent || ""}
            endContent={input.endContent || ""}
            // accept={input.accept || ""}
            // multiple={input.multiple || ""}
            readOnly={input.readOnly || false}
          />
        </>
      )}
    />
  );
}

export default InputCon;
