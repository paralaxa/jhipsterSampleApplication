import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Gajaka } from './gajaka.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Gajaka>;

@Injectable()
export class GajakaService {

    private resourceUrl =  SERVER_API_URL + 'api/gajakas';

    constructor(private http: HttpClient) { }

    create(gajaka: Gajaka): Observable<EntityResponseType> {
        const copy = this.convert(gajaka);
        return this.http.post<Gajaka>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(gajaka: Gajaka): Observable<EntityResponseType> {
        const copy = this.convert(gajaka);
        return this.http.put<Gajaka>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Gajaka>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Gajaka[]>> {
        const options = createRequestOption(req);
        return this.http.get<Gajaka[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Gajaka[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Gajaka = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Gajaka[]>): HttpResponse<Gajaka[]> {
        const jsonResponse: Gajaka[] = res.body;
        const body: Gajaka[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Gajaka.
     */
    private convertItemFromServer(gajaka: Gajaka): Gajaka {
        const copy: Gajaka = Object.assign({}, gajaka);
        return copy;
    }

    /**
     * Convert a Gajaka to a JSON which can be sent to the server.
     */
    private convert(gajaka: Gajaka): Gajaka {
        const copy: Gajaka = Object.assign({}, gajaka);
        return copy;
    }
}
