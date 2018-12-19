const { DocumentStore } = require('ravendb');

const store = new DocumentStore(["http://localhost:8080"], "Northwind");

store.initialize();

console.log('database connection sucessfull');

const session = store.openSession();

const subQuery = session.query({ collection: 'Orders' }).selectFields("Lines").count() > 4; 

const query = session.query({ collection: 'Orders' }).selectFields("{subQuery.ProductName}","OrderAt","{ShipTo.City}");


//from Employees
//where FirstName == "Nancy"
//from Orders
//where Lines.Count > 4

//select Lines[].ProductName as ProductNames, OrderedAt, ShipTo.City as City
//const results = query.all()
//                .then((result) => {console.log(result)
//                    });

const results = async () => {
  const data = await query.all();
  console.log(data);
};
results();


