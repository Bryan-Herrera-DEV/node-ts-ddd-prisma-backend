import { IResponse } from "../domain/IResponse";
export const ResponseProvider: IResponse = (res) => <T = null>(statusCode, message, data: T) => {
    res.status(statusCode).json({ code:statusCode, message, data });
};
