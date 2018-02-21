import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Gajaka2 } from './gajaka-2.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Gajaka2>;

@Injectable()
export class Gajaka2Service {

    private resourceUrl =  SERVER_API_URL + 'api/gajaka-2-s';

    constructor(private http: HttpClient) { }

    create(gajaka2: Gajaka2): Observable<EntityResponseType> {
        const copy = this.convert(gajaka2);
        return this.http.post<Gajaka2>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(gajaka2: Gajaka2): Observable<EntityResponseType> {
        const copy = this.convert(gajaka2);
        return this.http.put<Gajaka2>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Gajaka2>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Gajaka2[]>> {
        const options = createRequestOption(req);
        return this.http.get<Gajaka2[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Gajaka2[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Gajaka2 = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Gajaka2[]>): HttpResponse<Gajaka2[]> {
        const jsonResponse: Gajaka2[] = res.body;
        const body: Gajaka2[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Gajaka2.
     */
    private convertItemFromServer(gajaka2: Gajaka2): Gajaka2 {
        const copy: Gajaka2 = Object.assign({}, gajaka2);
        return copy;
    }

    /**
     * Convert a Gajaka2 to a JSON which can be sent to the server.
     */
    private convert(gajaka2: Gajaka2): Gajaka2 {
        const copy: Gajaka2 = Object.assign({}, gajaka2);
        return copy;
    }
}
