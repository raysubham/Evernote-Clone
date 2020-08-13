import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import Editor from "./editor/editor";
import Sidebar from "./sidebar/sidebar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    };
  }
  render() {
    return (
      <>
        <Sidebar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          selectNote={this.selectNote}
          newNote={this.newNote}
          deleteNote={this.deleteNote}
        />
        {this.state.selectedNote ? (
          <Editor
            selectedNoteIndex={this.state.selectedNote}
            selectedNote={this.state.selectedNote}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </>
    );
  }

  componentDidMount = () => {
    const db = firebase.firestore();
    db.collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ notes: notes });
      });
  };
  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  };

  noteUpdate = (id, noteObj) => {
    const db = firebase.firestore();
    db.collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  newNote = async (title) => {
    const db = firebase.firestore();

    const note = {
      title: title,
      body: "",
    };
    if (title) {
      const newFromDB = await db.collection("notes").add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      const newID = newFromDB.id;
      await this.setState({ notes: [...this.state.notes, note] });
      const newNoteIndex = this.state.notes.indexOf(
        this.state.notes.filter((_note) => _note.id === newID)[0]
      );
      this.setState({
        selectedNote: this.state.notes[newNoteIndex],
        selectedNoteIndex: newNoteIndex,
      });
    }
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter((_note) => _note !== note),
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length >= 1
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({ selectedNoteIndex: null, selectedNote: null });
    }
    const db = firebase.firestore();
    db.collection("notes").doc(note.id).delete();
  };
}
