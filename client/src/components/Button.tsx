
interface PropTypes {
    onClick: () => void,
    label: string,

}

export const Button = ({onClick, label}: PropTypes) => {

    return <button onClick={onClick}>{label}</button>
}