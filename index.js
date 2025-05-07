const express = require('express');
const NodeCache = require('node-cache'); 
const GoogleGenAI = require('@google/genai');

const app = express();
const myCache = new NodeCache();

const ai = new GoogleGenAI.GoogleGenAI({
  vertexai: true,
  project: process.env.GCLOUD_PROJECT,
  location: process.env.GCLOUD_REGION,
});

app.use(express.json());
const port = 8080;

let sampleResponse = [
  {
    "id": 1,
    "productName": "Laptop Pro X1",
    "sku": "LPX1-001",
    "category": "Electronics",
    "description": "High-performance laptop for professionals.",
    "manufacturer": "TechCorp",
    "supplier": "GlobalTech Solutions",
    "unitPrice": 1299.99,
    "unitsInStock": 50,
    "unitsOnOrder": 10,
    "reorderLevel": 20,
    "discontinued": false,
    "weight": 2.5,
    "dimensions": "30cm x 20cm x 1.5cm",
    "storageLocation": "Warehouse A, Shelf 3",
    "manufacturingDate": "2024-01-15",
    "expirationDate": null,
    "batchNumber": "BTX1-202401",
    "warrantyPeriod": "2 years",
    "imageUrl": "https://example.com/lpx1.jpg"
  },
  {
    "id": 2,
    "productName": "Wireless Mouse Ergonomic",
    "sku": "WMERGO-002",
    "category": "Accessories",
    "description": "Ergonomic wireless mouse for comfortable use.",
    "manufacturer": "ErgoTech",
    "supplier": "OfficeSupplies Inc.",
    "unitPrice": 29.99,
    "unitsInStock": 150,
    "unitsOnOrder": 0,
    "reorderLevel": 50,
    "discontinued": false,
    "weight": 0.1,
    "dimensions": "10cm x 6cm x 3cm",
    "storageLocation": "Warehouse B, Shelf 7",
    "manufacturingDate": "2023-12-01",
    "expirationDate": null,
    "batchNumber": "WMERGO-202312",
    "warrantyPeriod": "1 year",
    "imageUrl": "https://example.com/wmergo.jpg"
  },
  {
    "id": 3,
    "productName": "External Hard Drive 1TB",
    "sku": "HDEXT-003",
    "category": "Storage",
    "description": "Portable 1TB external hard drive.",
    "manufacturer": "DataSafe",
    "supplier": "Memory Solutions Ltd.",
    "unitPrice": 79.99,
    "unitsInStock": 80,
    "unitsOnOrder": 20,
    "reorderLevel": 30,
    "discontinued": false,
    "weight": 0.2,
    "dimensions": "12cm x 8cm x 2cm",
    "storageLocation": "Warehouse A, Shelf 5",
    "manufacturingDate": "2024-02-10",
    "expirationDate": null,
    "batchNumber": "HDEXT-202402",
    "warrantyPeriod": "3 years",
    "imageUrl": "https://example.com/hdext.jpg"
  },
  {
    "id": 4,
    "productName": "Monitor 27 inch IPS",
    "sku": "MONIPS-004",
    "category": "Electronics",
    "description": "27-inch IPS monitor with vibrant colors.",
    "manufacturer": "VisionTech",
    "supplier": "Display Solutions",
    "unitPrice": 249.99,
    "unitsInStock": 35,
    "unitsOnOrder": 5,
    "reorderLevel": 15,
    "discontinued": false,
    "weight": 5,
    "dimensions": "62cm x 40cm x 5cm",
    "storageLocation": "Warehouse C, Shelf 1",
    "manufacturingDate": "2023-11-20",
    "expirationDate": null,
    "batchNumber": "MONIPS-202311",
    "warrantyPeriod": "2 years",
    "imageUrl": "https://example.com/monips.jpg"
  },
  {
    "id": 5,
    "productName": "Keyboard Mechanical RGB",
    "sku": "KBMEC-005",
    "category": "Accessories",
    "description": "Mechanical keyboard with customizable RGB lighting.",
    "manufacturer": "KeyMaster",
    "supplier": "Peripheral Partners",
    "unitPrice": 99.99,
    "unitsInStock": 60,
    "unitsOnOrder": 15,
    "reorderLevel": 25,
    "discontinued": false,
    "weight": 1.2,
    "dimensions": "45cm x 15cm x 4cm",
    "storageLocation": "Warehouse B, Shelf 4",
    "manufacturingDate": "2024-03-05",
    "expirationDate": null,
    "batchNumber": "KBMEC-202403",
    "warrantyPeriod": "1 year",
    "imageUrl": "https://example.com/kbmec.jpg"
  },
  {
    "id": 6,
    "productName": "Webcam HD 1080p",
    "sku": "WBHD-006",
    "category": "Accessories",
    "description": "HD webcam with 1080p resolution for clear video calls.",
    "manufacturer": "CamVision",
    "supplier": "OnlineMeeting Solutions",
    "unitPrice": 49.99,
    "unitsInStock": 100,
    "unitsOnOrder": 0,
    "reorderLevel": 40,
    "discontinued": false,
    "weight": 0.08,
    "dimensions": "8cm x 5cm x 3cm",
    "storageLocation": "Warehouse A, Shelf 8",
    "manufacturingDate": "2023-10-12",
    "expirationDate": null,
    "batchNumber": "WBHD-202310",
    "warrantyPeriod": "1 year",
    "imageUrl": "https://example.com/wbhd.jpg"
  },
  {
    "id": 7,
    "productName": "USB Hub 4 Ports",
    "sku": "HUBUSB-007",
    "category": "Accessories",
    "description": "USB hub with 4 ports for expanding connectivity.",
    "manufacturer": "PortPlus",
    "supplier": "Connectivity Experts",
    "unitPrice": 14.99,
    "unitsInStock": 200,
    "unitsOnOrder": 0,
    "reorderLevel": 75,
    "discontinued": false,
    "weight": 0.05,
    "dimensions": "9cm x 3cm x 2cm",
    "storageLocation": "Warehouse B, Shelf 2",
    "manufacturingDate": "2024-01-28",
    "expirationDate": null,
    "batchNumber": "HUBUSB-202401",
    "warrantyPeriod": "6 months",
    "imageUrl": "https://example.com/hubusb.jpg"
  },
  {
    "id": 8,
    "productName": "HDMI Cable 6ft",
    "sku": "HDMICABLE-008",
    "category": "Cables",
    "description": "6ft HDMI cable for high-definition video and audio.",
    "manufacturer": "SignalConnect",
    "supplier": "Cable Solutions Inc.",
    "unitPrice": 9.99,
    "unitsInStock": 300,
    "unitsOnOrder": 0,
    "reorderLevel": 100,
    "discontinued": false,
    "weight": 0.15,
    "dimensions": "183cm x 1cm x 1cm",
    "storageLocation": "Warehouse C, Shelf 5",
    "manufacturingDate": "2023-09-05",
    "expirationDate": null,
    "batchNumber": "HDMICABLE-202309",
    "warrantyPeriod": "Lifetime",
    "imageUrl": "https://example.com/hdmicable.jpg"
  },
  {
    "id": 9,
    "productName": "Power Bank 10000mAh",
    "sku": "PBANK-009",
    "category": "Power",
    "description": "Portable power bank with 10000mAh capacity.",
    "manufacturer": "PowerUp",
    "supplier": "Energy Solutions",
    "unitPrice": 39.99,
    "unitsInStock": 70,
    "unitsOnOrder": 30,
    "reorderLevel": 20,
    "discontinued": false,
    "weight": 0.25,
    "dimensions": "11cm x 7cm x 2cm",
    "storageLocation": "Warehouse A, Shelf 1",
    "manufacturingDate": "2024-02-22",
    "expirationDate": null,
    "batchNumber": "PBANK-202402",
    "warrantyPeriod": "1 year",
    "imageUrl": "https://example.com/pbank.jpg"
  },
  {
    "id": 10,
    "productName": "Cleaning Kit Electronics",
    "sku": "CLEANKIT-010",
    "category": "Maintenance",
    "description": "Cleaning kit for electronics devices.",
    "manufacturer": "CleanTech",
    "supplier": "Maintenance Solutions",
    "unitPrice": 19.99,
    "unitsInStock": 120,
    "unitsOnOrder": 0,
    "reorderLevel": 45,
    "discontinued": false,
    "weight": 0.3,
    "dimensions": "15cm x 10cm x 5cm",
    "storageLocation": "Warehouse C, Shelf 3",
    "manufacturingDate": "2023-12-15",
    "expirationDate": null,
    "batchNumber": "CLEANKIT-202312",
    "warrantyPeriod": "None",
    "imageUrl": "https://example.com/cleankit.jpg"
  }
];

app.post('/*', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.get('/*', async (req, res) => {
  const geminiResponse = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: "Generate a realistic raw JSON response to a GET request on the path " + req.path + ". Do not use markdown or new line characters in your response.",
  });

  res.json(JSON.parse(geminiResponse.text));
});

app.put('/*', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.delete('/*', async (req, res) => {
  const geminiResponse = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: "Generate a realistic raw JSON response to a DELETE request on the path " + req.path + ". Do not use markdown or new line characters in your response.",
  });

  res.json(JSON.parse(geminiResponse.text));
});

app.listen(port, () => {
  console.log(`Mirror service listening on port ${port}`)
});