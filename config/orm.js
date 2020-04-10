const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    const arr = [];
    for(var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};

function objToSql(ob) {
    const arr = [];
    for(var key in ob) {
        const value = ob[key];
        if(Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            };
            arr.push(key + "=" + value);
        };
    };
    return arr.toString();
};

const orm = {
    all: function(tableInput, cb) {
        const queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    create: function(table, cols, vals, cb) {
        const queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";      
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log(queryString);

        connection.query(queryString, vals, function(err, res) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    
}