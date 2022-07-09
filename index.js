const express = require("express")
const app = express()
const googleIt = require('google-it')
const bp = require("body-parser")

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render(process.cwd() + "/views/index.ejs")
})

app.get("/search", (req, res) => {
    const q = req.query.q
    if(q.length === 0){
        res.redirect("/")
    }else{
        googleIt({"query": q, "limit": 31}).then(search => {
            res.render(process.cwd() + "/views/search.ejs", { search: search })
        }).catch(err => {
            console.log(err)
        })
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log("server aktif")
})