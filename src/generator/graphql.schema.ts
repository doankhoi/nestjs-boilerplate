
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class HelloMessage {
    message: string;
}

export abstract class IQuery {
    abstract hello(): Nullable<HelloMessage> | Promise<Nullable<HelloMessage>>;
}

type Nullable<T> = T | null;
