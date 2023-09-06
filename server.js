const fs = require('fs')
const express = require('express')
const { json } = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + "/public"))
app.use(express.json())

app.get('/getitems', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'))
        res.json(data)
})

app.post('/setitem', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'))
    data.items[data.items.length] = req.body.newitem
    fs.writeFileSync('db.json', JSON.stringify(data))
    res.status(200).json({msg: 'item saved'})
})
app.listen(PORT, () => {

})