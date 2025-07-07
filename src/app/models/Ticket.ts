import { Type } from "@angular/core";
import { TypePayments } from "./TypePayments";
import { Function } from "./Functions";

export class Ticket {
    id: number = 0;
    totalpay: any = 0;
    fechapago: Date = new Date(Date.now());
    typepayments_id: TypePayments = new TypePayments();
    functions_id: Function = new Function();
}
