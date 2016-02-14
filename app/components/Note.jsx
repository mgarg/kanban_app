var React = require('react');
var _ = require('underscore');

// this does not go in module.exports so it behaves like private function
var isNumber = function(ch){
    return ch>='0' && ch<='9';
};
var containsDigits = function(v){
    for(var i=0;i<v.length;i++){
        if(isNumber(v.charAt(i)))
            return true;
    }
    return false;
};
var NoteComponent = React.createClass({
    getInitialState:  function(){
       return {editing: false};
    },
    edit: function () {
        this.setState({editing:true});
    },
    renderNote: function(){
        const task = this.props.task;
        const onDelete = this.props.onDelete;
        console.log(onDelete);
        return (<div onClick = {this.edit}>
            <span>{task}</span>
            <button onClick = {this.props.onDelete}>x</button>;

        </div>);
    },
    renderDelete: function(){
        return <button onClick = {this.props.onDelete}>x</button>;
    },
    checkEnter: function(e){
        if(e.key === 'Enter'){
            this.finishEdit(e);
        }

    },

    finishEdit: function(e){
        // we must communicate the change of value to app..onEdit will hepl in that
        const value = e.target.value;
        if(this.props.onEdit && value.trim()) {
            if(containsDigits(value))
                alert("plz enter alphabets only");
            else
                this.props.onEdit(value);

            this.setState({editing: false});
        }
    },
    renderOnEdit: function(){
        var task = this.props.task;
        return <input type = "text" autoFocus = {true}
                      defaultValue={task} onBlur = {this.finishEdit} onKeyPress={this.checkEnter}/>;
    },
    render: function() {
        return (this.state.editing?this.renderOnEdit():this.renderNote());

    }
});

//simple classes that do not have state can be written as a function(props)
var NotesComponent = function(props) {

    const notes = props.notes;
    const onEdit = props.onEdit;
    const onDelete = props.onDelete;

    return (
        <div>
            <ul>
                {
                    notes.map(function (n) {
                        var g = onEdit.bind(null, n.id);
                        var h = onDelete.bind(null, n.id);
                        return <li key={n.id}>
                            <NoteComponent task={n.task}
                                           onEdit={v => onEdit(n.id,v)}
                                           onDelete={h}
                            />
                        </li>;
                    })
                }
            </ul>
        </div>
    );

};

module.exports = NotesComponent;