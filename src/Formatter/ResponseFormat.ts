export interface IResponse {
    result: Array<object>
}

export class ResponseFormat {
    static _make = (response: any): IResponse => {
        return { result: response };
    };

    static _makePaginated = (response: any, limit: number, offset: number): any => {
        return { result: { items: response }, limit: limit, offset: offset };
    };
}