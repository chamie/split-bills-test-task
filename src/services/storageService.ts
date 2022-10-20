import { BillDto } from "../types/billModel";
import { ContactModel } from "../types/contactModel";

export const loadBills = (): BillDto[] =>
    (loadLSDataByName<BillDto[]>("bills") || []);

export const saveBills = (bills: BillDto[]): void =>
    saveLSDataByName<BillDto[]>("bills", bills);

export const loadContacts = (): ContactModel[] =>
    loadLSDataByName("contacts") || [];

export const saveContacts = (contacts: readonly ContactModel[]) =>
    saveLSDataByName("contacts", contacts);

const loadLSDataByName = <T>(name: string): T => {
    const stringified = localStorage[name];
    return stringified ? JSON.parse(stringified) as T : stringified;
}

const saveLSDataByName = <T>(name: string, data: T) => {
    localStorage[name] = JSON.stringify(data);
}