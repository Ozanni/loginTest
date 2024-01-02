import {
    ReactNode,
    KeyboardEvent,
    useMemo,
    useCallback,
    useEffect
} from 'react';
import {
    useForm,
    FieldValues,
    UseFormReturn,
    UseFormHandleSubmit,
    UseFormProps,
} from 'react-hook-form';

export interface IFormControlInputProps<T extends FieldValues> extends UseFormReturn<T> {
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    submit: ReturnType<UseFormHandleSubmit<T>>;
}

export type AccessibleFormInstance<T extends FieldValues> = {
    submit?: ReturnType<UseFormHandleSubmit<T>>
} & UseFormReturn<T>;

export interface MyFormGroupUnstyledProps<T extends FieldValues> {
    className?: string;
    renderInputs: (controls: IFormControlInputProps<T>) => ReactNode;
    renderSubmit?: (controls: IFormControlInputProps<T>) => ReactNode;
    onSubmit: (payload: T) => void;
    submitOnEnter?: boolean;
    formOptions: UseFormProps<T>;
    registerFormFunctions?: (args: AccessibleFormInstance<T>) => void;
}

export function MyFormGroupUnstyled<T extends FieldValues>(props: MyFormGroupUnstyledProps<T>) {
    const {
        className,
        renderInputs,
        renderSubmit,
        onSubmit,
        submitOnEnter,
        formOptions,
        registerFormFunctions
    } = props;
    const methods = useForm<T>(formOptions);
    const { handleSubmit } = methods;

    const execSubmit = useMemo(
        () => handleSubmit(async (data) => await onSubmit(data)),
        [handleSubmit, onSubmit]
    );
    
    const onKeyDown: IFormControlInputProps<T>['onKeyDown'] = useCallback((event) => {
        if (submitOnEnter) {
            event.code === 'Enter' && execSubmit();
        }
    }, [execSubmit, submitOnEnter]);

    const control: IFormControlInputProps<T> = useMemo(() => ({
        onKeyDown,
        submit: execSubmit,
        ...methods
    }), [onKeyDown, execSubmit, methods]);

    useEffect(() => {
        const accessibleFormInstance = {
            ...methods,
            submit: execSubmit
        }
        if (registerFormFunctions) {
            registerFormFunctions(accessibleFormInstance);
        }
    }, [execSubmit, methods, registerFormFunctions]);

    return (
        <form className={className}>
            {renderInputs(control)}
            {renderSubmit && renderSubmit(control)}
        </form>
    );
}