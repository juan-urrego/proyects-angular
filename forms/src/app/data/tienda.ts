import { UserSettings } from './user-settings';

export interface tienda {
    name: string,
    ciudad: string,
    numero: number,
    usuarios: UserSettings[]
}