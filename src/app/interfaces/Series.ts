import {Book} from './Book'
export interface Series{
    title: string,
    description: string,
    books?: Book[]
    owner: string
    editors?: string[]
}