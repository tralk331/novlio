import {Book} from './Book'
import {User} from './User'
export interface Series{
    name: string,
    books?: Book[]
    owner: string
    editors?: string[]
}