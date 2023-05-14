import getweeklyWaste from './get_weekly_waste_statistics.js'

import httpMocks from 'node-mocks-http';
import fs from "fs"
import mockFs from 'mock-fs';

describe("Test getweeklyWaste function", () => {
    beforeEach(() => {
        const fakedata = [
            {
                "location": "fridge",
                "name": "Pepper, hot chili, raw",
                "expirationDate": "2023-04-27",
                "weight": "1000",
                "wastedDate": "2023-05-13",
                "eaten": 750
              },
              {
                "location": "fridge",
                "name": "Sausage, salami",
                "expirationDate": "2023-04-27",
                "weight": "350",
                "wastedDate": "2023-05-11",
                "eaten": 0
              },
              {
                "location": "fridge",
                "name": "Sausage, salami",
                "expirationDate": "2023-04-27",
                "weight": "350",
                "wastedDate": "2023-05-12",
                "eaten": 0
              },
              {
                "location": "fridge",
                "name": "Sausage, salami",
                "expirationDate": "2023-04-27",
                "weight": "350",
                "wastedDate": "2023-05-05",
                "eaten": 0
              }
        ];
     
        mockFs({
            "./username/wastedItems.json": JSON.stringify(fakedata)
        });
    });


afterEach(() => {
    mockFs.restore();
});

test("It should get wasted items from the last 7 days", async () => {
    const filePath = "./username/wastedItems.json";

    const req = httpMocks.createRequest({
        method: "GET",
        url: "/API/getweeklyWaste",
        body: { nameofitem: "thispartwetest", property: "properti", value: "right"}
    });

    const res = httpMocks.createResponse();

    const middleware = getweeklyWaste(filePath);
    await middleware(req, res);

    expect(res.statusCode).toBe(200);

    const updatedData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    expect(updatedData[5].properti).toBe("right");
});
});