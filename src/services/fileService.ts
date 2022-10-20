import { RootState } from "../app/store";

export const saveData = (data: RootState) => {
    const a = document.createElement("a");
    a.download = "SplitBillsData.json";
    const file = new Blob([JSON.stringify(data)], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export const loadData = (): Promise<RootState> => new Promise((resolve) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".json");
    input.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        if(!target.files)
            return;

        const reader = new FileReader();
        reader.addEventListener("load", event => {
            const contents = event.target!.result as string;
            const data = JSON.parse(contents) as RootState;
            input.remove();
            resolve(data);
        });

        reader.readAsText(target.files[0]);
    })
    input.click();
})