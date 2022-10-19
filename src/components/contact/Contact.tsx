export type Props = {
    name: string,
    id: number,
    isChecked: boolean,
    onNameClick: (id: number) => void,
    onCheck: (id: number) => void,
}

export const Contact = (props: Props) => {
    return (
        <>
            <input
                type={"checkbox"}
                checked={props.isChecked}
                onChange={() => props.onCheck(props.id)}
                aria-label={props.name}
            />
            <span onClick={() => props.onNameClick(props.id)}>
                {props.name}
            </span>
        </>
    );
}