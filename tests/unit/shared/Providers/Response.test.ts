import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("ResponseProvider", () => {
  it("debe enviar una respuesta JSON con los datos proporcionados", async () => {
    const res = mockResponse();
    const statusCode = 200;
    const message = "Éxito";
    const data = { foo: "bar" };

    const responseFunction = ResponseProvider(res);
    responseFunction(statusCode, message, data);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({ code: statusCode, message, data });
  });
});
