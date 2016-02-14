var React = require('react');
var uuid = require('node-uuid');
var Notes = require('./Note.jsx');
var _ = require('underscore');

module.exports = React.createClass({
    getInitialState: function () {

        const notes = [
            {
                id: uuid.v4(),
                task: 'Learn '
            },
            {
                id: uuid.v4(),
                task: 'Learn React'
            },
            {
                id: uuid.v4(),
                task: 'Do laundry'
            }
        ];
        var notesMap = {};
        notes.forEach(function(n){
            notesMap[n.id] = n;
        });
        return {notes: notesMap};
    },
    addNote: function(){
        console.log("function entered");
        const id = uuid.v4();
        this.state.notes[id] = { // concat returns a new array whereas push modifies the same
            id: id,
            task: "something"
        };
        this.setState({notes:this.state.notes});
    },
    editNote: function(id,task){ // using hashMap wud make CRUD operations O(1)
        if(task) {
            const notes = this.state.notes;
            notes[id].task = task;
            this.setState({notes: notes});
        }

    },
    deleteNote: function(id){
        const notes = this.state.notes;
        delete(notes[id]);

        this.setState({notes:notes});
    },
    render: function () {
        var notes = this.state.notes;
        return (
            <div>
                <button onClick = {this.addNote}>+</button>
                <Notes notes = {_.values(notes)} onEdit = {this.editNote}
                       onDelete = {this.deleteNote}/>
            </div>
        );
    }
});

