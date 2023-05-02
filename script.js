import fs from "fs";
import path from "path"
fs.promises.readFile(path.resolve() + "/data/Global-items/Global-Items.json")
    .then(data => {
        return JSON.parse(data);
    })
    .then(result => {
        result.forEach(element => {
            if (element.co2_per_1kg !== undefined && element.co2_per_1kg.includes(",")) {

                element.co2_per_1kg = element.co2_per_1kg.replace(",", ".");
            }
        });
        fs.writeFileSync(path.resolve() + "/data/Global-items/Global-Items.json", JSON.stringify(result, null, 2));
    })