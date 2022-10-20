import { BillDto } from "../types/billModel";
import { ContactModel } from "../types/contactModel";

/**
 * Loads bills array from "bills" LocalStorage key
 * @returns Bills array or empty array if no such key
 */
export const loadBills = (): BillDto[] =>
    (loadLSDataByName<BillDto[]>("bills") || []);

/**
 * Saves a bills array to "bills" LocalStorage key
 * @param bills Bills array to save
 */
export const saveBills = (bills: BillDto[]): void =>
    saveLSDataByName<BillDto[]>("bills", bills);

/**
 * Loads contacts from "contacts" LocalStorage key
 * @returns Contacts array or empty array if no such key.
 */
export const loadContacts = (): ContactModel[] =>
    loadLSDataByName("contacts") || [];

/**
 * Serializes and saves contacts array to LocalStorage under a "contacts" key.
 * @param contacts contacts array
 */
export const saveContacts = (contacts: readonly ContactModel[]) =>
    saveLSDataByName("contacts", contacts);

const loadLSDataByName = <T>(name: string): T => {
    const stringified = localStorage[name];
    return stringified ? JSON.parse(stringified) as T : stringified;
}

const saveLSDataByName = <T>(name: string, data: T) => {
    localStorage[name] = JSON.stringify(data);
}