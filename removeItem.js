import path from "path";
import fs from "fs";
const removeItem = {
    consumeItem: (req, res) => {
        const filePathitems = path.resolve() + `/data/USERS/${req.user.username}/items.json`;
        const filePathConsumed = path.resolve() + `/data/USERS/${req.user.username}/consumeditems.json`;
        let item;
        fs.readFile(filePathitems, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
            } else {
                let filejson = JSON.parse(data);
                item = filejson[req.body.index];
                filejson.splice(req.body.index, 1);
                fs.writeFile(filePathitems, JSON.stringify(filejson, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    fs.readFile(filePathConsumed, { encoding: 'utf8' }, (err, data) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send("Internal Server Error");
                        } else {
                            let filejson = JSON.parse(data);
                            filejson.push(item);
                            fs.writeFile(filePathConsumed, JSON.stringify(filejson, null, 2), (err) => {
                                if (err) {
                                    console.error('Error writing file:', err);
                                    return;
                                }
                                res.status(200).send("success");
                            })
                        }
                    })
                })
            }
        })
    },
    waisteItem: (req, res) => {
        const filePathitems = path.resolve() + `/data/USERS/${req.user.username}/items.json`;
        const filePathConsumed = path.resolve() + `/data/USERS/${req.user.username}/wasteditems.json`;
        let item;
        fs.readFile(filePathitems, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
            } else {
                let filejson = JSON.parse(data);
                item = filejson[req.body.index];
                filejson.splice(req.body.index, 1);
                fs.writeFile(filePathitems, JSON.stringify(filejson, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    fs.readFile(filePathConsumed, { encoding: 'utf8' }, (err, data) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send("Internal Server Error");
                        } else {
                            let filejson = JSON.parse(data);
                            filejson.push(item);
                            fs.writeFile(filePathConsumed, JSON.stringify(filejson, null, 2), (err) => {
                                if (err) {
                                    console.error('Error writing file:', err);
                                    return;
                                }
                                res.status(200).send("success");
                            })
                        }
                    })
                })
            }
        })
    }
}
export default removeItem;