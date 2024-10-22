import { FormInterface, FormSearchInterface } from "../../Form/interface/Form";

export interface InputInterface {
    maxLength: number
    minLength: number
    type: string;
    placeholder: string
    required: boolean;
    state: FormInterface | FormSearchInterface;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setState: Function;
}