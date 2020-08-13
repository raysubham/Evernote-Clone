import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./sidebarStyles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../sidebarItem/sidebarItem";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      addingNote: false,
    };
  }
  render() {
    const { classes, notes, selectedNoteIndex } = this.props;

    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
            {this.state.addingNote ? "CANCEL" : "NEW NOTE"}
          </Button>
          {this.state.addingNote ? (
            <div>
              <input
                type="text"
                className={classes.newNoteInput}
                placeholder="Enter Note Title..."
                onKeyUp={(e) => this.updateTitle(e.target.value)}
              />
              <Button
                type="submit"
                onClick={this.newNote}
                className={classes.newNoteSubmitBtn}
              >
                Submit Button
              </Button>
            </div>
          ) : null}

          <List>
            {notes.map((_note, _index) => {
              return (
                <div key={_index}>
                  <SidebarItem
                    _index={_index}
                    _note={_note}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  />
                  <Divider></Divider>
                </div>
              );
            })}
          </List>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };

  updateTitle = (text) => {
    this.setState({ title: text });
  };
  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  };
  selectNote = (n, i) => {
    this.props.selectNote(n, i);
  };
  deleteNote = (note) => {
    this.props.deleteNote(note);
  };
}

export default withStyles(styles)(Sidebar);
