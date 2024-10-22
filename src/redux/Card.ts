import { ArrCards } from "../interface/App";
import { POST_TEST } from "./types/Types";

const initialState = {
    test: []
};

export default (state = initialState, { type, payload }: { type: string, payload: ArrCards[] }) => {
    switch (type) {
        case POST_TEST:
            return {
                ...state,
                test: payload
            }
        default:
            return state;
    }
}