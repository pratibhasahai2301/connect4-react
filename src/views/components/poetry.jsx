import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { nanoid } from "nanoid";
import { poetryActions } from '../../ducks/poetry';

const Poetry = (props) => {
  const {undo, moveHappened, fetchPoetry, clear, onPoetryLoad, onUndo} = props;
  const { poetry, error } = props.poetry;
  const [displayedPoetry, setDisplayedPoetry] = useState([]);

  useEffect(() => {
    fetchPoetry();
  }, [fetchPoetry]);

  useEffect(() => {
    const removePoetry = () => {
      const displayedPoetryList = [...displayedPoetry];
      displayedPoetryList.pop();
      setDisplayedPoetry(displayedPoetryList);
      onUndo();
    }

    const addPoetry = () => {
      if (poetry.length) {
        let randomPoemTitleIndex = Math.floor(Math.random() * (poetry.length - 1)) + 1;
        let poem = poetry[randomPoemTitleIndex];
        while (!poem) {
          randomPoemTitleIndex = Math.floor(Math.random() * (poetry.length - 1)) + 1;
          poem = poetry[randomPoemTitleIndex];
        }

        if (poem && poem.linecount) {
          let randomLineFromPoem =  Math.floor(Math.random() * (poem.linecount - 1)) + 1;
          let randomLine = poem.lines[randomLineFromPoem];
          while(!randomLine) {
            randomLineFromPoem =  Math.floor(Math.random() * (poem.linecount - 1)) + 1;
            randomLine = poem.lines[randomLineFromPoem];
          }

          const displayedPoetryList = [...displayedPoetry];
          displayedPoetryList.push({
            id: nanoid(),
            title: poem.title,
            line: randomLine
          });
          setDisplayedPoetry(displayedPoetryList);
          onPoetryLoad();
        }
      }
    }

    if (undo) {
      removePoetry();
    }

    if (moveHappened) {
      addPoetry();
    }

    if (clear) {
      setDisplayedPoetry([]);
    }
    // eslint-disable-next-line
  }, [undo, moveHappened, clear, onPoetryLoad, onUndo, poetry]);

  return (
    <div className="poem" data-testid="poem">
      {
        Object.keys(error).length !== 0  && <div className="alert alert-danger"
                                                 role="alert">
          { error.message }
        </div>
      }
      {
        Object.keys(error).length === 0 && <div className="list-group h-100">
          {
            displayedPoetry.map((poem) => (
              <div key={poem.id}
                   className="list-group-item list-group-item-action"
                   data-testid="poem-lines">
                { poem.title } : { poem.line }
              </div>
            ))
          }
        </div>
      }
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    poetry: state.poetry.poetryEntities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPoetry: () => dispatch(poetryActions.poetryRequested()),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Poetry );