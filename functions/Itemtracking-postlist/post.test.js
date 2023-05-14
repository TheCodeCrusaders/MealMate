import httpMocks from 'node-mocks-http';
import fs from 'fs';
import mockFs from 'mock-fs';
import postlist from './postlist';


console.log("12345");
// Define a test case
describe("testing: POST /API/postlist", () => {

beforeEach(()=>{
const dataset = [{
            location: "location1",
            name: "name1",
            expirationDate: "expdate1",
            weight: "weight1"
          }];

mockFs({'./postlist.json': JSON.stringify(dataset)});

  
});
afterEach(() => {
  mockFs.restore();
})


test('it should post the item', async () => {
  const fakedata2 = [];
  const filePath = './postlist.json';

  const req = httpMocks.createRequest( {
    method: 'POST',
    url: '/API/postlist',
    body: { "location": "location5",
            "name": "name2",
            "expirationDate": "expdate2",
            "weight": "weight2"}
  });

  const res = httpMocks.createResponse();

    /*return async function (req, res) {
        try {
            let name_of_object = req.body.nameofitem;
            //let newpropname_of_item = req.body.property;
            //let newvalue = req.body.value;

            const data = await fs.promises.readFile(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            //const itemIndex = jsonData.findIndex(item => item.name === name_of_object);
            
            //jsonData[itemIndex][newpropname_of_item] = newvalue;
            
            await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2));
            
            res.status(200).json({ message: 'Prop/value added successfully' });
        } catch (err) {
            console.error(err+"here it goes wrong");
            res.status(500).send("Internal Server Error");
        }
    }*/

  const something = postlist(filePath);
  await something(req,res);

  //expect(res.statusCode).toBe(200);// it will do it corectly and therefore send status 200

  const updatedData = JSON.parse(fs.readFileSync(filePath)); // this reads in the fake file system
    console.log(updatedData)
  expect(updatedData[1].location).toBe("location5");// Here we check if the updated date is correct


  });
});
