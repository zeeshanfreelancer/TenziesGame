export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
    };

    const dicePips = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

    return (
        <button
            style={styles}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "Held" : "Not held"}`}
            role="button"
            tabIndex="0"
        >
            {dicePips[props.value]}
        </button>
    );
}