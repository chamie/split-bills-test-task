export type ActionButtonModel<T> = {
    title: string,
    onClick: (props: T) => void,
}