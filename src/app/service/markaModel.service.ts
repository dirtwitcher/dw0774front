import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MarkaModelService {

    constructor(private httpClient: HttpClient) { }

    getData(){
        return this.httpClient.get('src/app/data/dataMarkaModel.json')
    }
}
