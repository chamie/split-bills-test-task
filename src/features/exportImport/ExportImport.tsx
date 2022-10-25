import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectAll } from "../../app/store"
import { loadData, saveData } from "../../services/fileService";
import { setContacts } from "../contacts/contactsSlice";
import { setBills } from "../bills/billsSlice";
import * as StorageService from '../../services/storageService';

export const ExportImport = () => {
    const data = useAppSelector(selectAll);
    const dispatch = useAppDispatch();
    const handleFileSelect = async () => {
        const state = await loadData();
        
        dispatch(setContacts(state.contacts.contacts));
        dispatch(setBills(state.bills.bills));
        StorageService.saveBills(state.bills.bills);
        StorageService.saveContacts(state.contacts.contacts);
    }

    return <div>
        <h3>Export/Import</h3>
        <button onClick={()=>saveData(data)}>Export data to file</button>
        <button onClick={handleFileSelect}> Import data from file</button>
    </div>
}