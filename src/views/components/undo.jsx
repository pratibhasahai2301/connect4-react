export const Undo = (props) => {
  return (
    <button className="btn btn-primary"
            onClick={props.onUndo}
            data-testid="button-undo"
            disabled={props.undoDisabled}>Undo Last Move</button>
  );
}
