const express = require("express");

const PORT = 12000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


let todos = [
    { id: 1, task: "Learn Node.js", done: false },
    { id: 2, task: "Practice JavaScript", done: false },
    { id: 3, task: "Build a To-Do App", done: true }
];

let id = 4;



app.get("/", (req, res) => {
    res.render("home", { todos });
});


app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/addTodo", (req, res) => {
    const todo = {
        id: id++,
        task: req.body.task,
        done: false
    };

    todos.push(todo);

    res.redirect("/");
});

app.get("/edit", (req, res) => {
    const todo = todos.find(t => t.id == req.query.id);

    if (!todo) return res.send("Task not found");

    res.render("edit", { todo });
});


app.post("/updateTodo", (req, res) => {
    todos = todos.map(t => {
        if (t.id == req.body.id) {
            return {
                id: t.id,
                task: req.body.task,
                done: req.body.done === "true"
            };
        }
        return t;
    });

    res.redirect("/");
});


app.get("/delete", (req, res) => {
    todos = todos.filter(t => t.id != req.query.id);
    res.redirect("/");
});



app.listen(PORT, err => {
    if (err) {
        console.log("Server not started…", err);
        return;
    }
    console.log("Server running on port ");
});
