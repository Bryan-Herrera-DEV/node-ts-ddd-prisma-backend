import { IResponse } from "../domain/IResponse";
export const ResponseProvider: IResponse = (res) => async <T = null>(statusCode, message, data: T) => {
    res.status(statusCode).json({ message, data });
};