import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { MyCheckbox, MyCheckboxProps } from "./MyCheckbox";

export type MyFormCheckboxFieldProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    MyCheckboxProps?: MyCheckboxProps;
};

export function MyFormCheckboxField<T extends FieldValues>(
    props: MyFormCheckboxFieldProps<T>
){
    const { name, control, MyCheckboxProps } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange} }) => (
                <MyCheckbox
                    checked={!!value}
                    onChange={onChange}
                    {...MyCheckboxProps}
                />
            )}
        />
        // <MyCheckbox
        //     {...control?.register(name)}
        //     {...MyCheckboxProps}
        // />
    );
}
