import { POST_TEST } from "../types/Types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HaveTest: any = (info: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dispatch:any) => {
        dispatch({
            type: POST_TEST,
            payload: info
        })
    }
}