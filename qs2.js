const prompt = require('prompt-sync')();

class Politician
{
    static incrementing_id=1
    constructor()
    {
        this.name;
        this.votes;
        this.money
        this.id;
    }
    input_Politician_details()
    {
        console.log(`For Politician ${Politician.incrementing_id}`);
        this.name=prompt("Enter the Name: ");
        this.votes=Number(prompt("Enter the votes: "));
        this.money=Number(prompt("Enter the money: "))
        this.id=Politician.incrementing_id;
        Politician.incrementing_id += 1
    }
}

class nPolitician
{
    constructor()
    {
        this.array=[];
        this.n;
    }
    input_n()
    {
        this.n=Number(prompt("Enter the Number of Politicians: "));
    }
    populate()
    {
        for (let i=0;i<this.n;i++)
        {
            this.array[i]= new Politician();
            this.array[i].input_Politician_details(i);
        }
    }
}

const {MongoClient} = require('mongodb');
url="mongodb+srv://meghan:meghan@practicecluster.dxjehc1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);

const database = client.db('Paltisian');
// database.createCollection('Politician');
const collection = database.collection('Politician');
console.log("Connected to Database");


async function inserting_data(s)
{
    data=[]
    // let name = prompt("Enter the Name of the Politician: ");
    // let id = Number(prompt("Enter the ID of the Politician: "));
    // let votes = Number(prompt("Enter the votes of the Politician: "));
    for(let i=0;i<s.n;i++)
    {
        data.push({Name:s.array[i].name,ID:s.array[i].id,votes:s.array[i].votes, money:s.array[i].money});
    }
    result = await collection.insertMany(data);
    await console.log("Inserted the Data");
}

async function reading_data()
{
    // let name = prompt("Enter the Name of the Politician: ");
    // result = await collection.find({Name:`${name}`}).toArray();
    result = await collection.find().toArray();
    // await console.log(result);
    return result;
}

async function updating_data()
{
    let id = Number(prompt("Select ID of the Politician: "));
    let revisedmoney = prompt("Enter the Revised Money of the Politician: ");
    await collection.updateOne({ID:id},{$set:{money:revisedmoney}});
    await console.log("Updated the Record")
    result = await collection.find({ID:id}).toArray();
    await console.log(result);
}

async function deleting_data()
{
    let id = Number(prompt("Select ID of the Politician: "));
    await collection.deleteOne({ID:id});
    await console.log("Deleted Record")
}

async function find_max_min_avg()
{
    a=await reading_data();
    let highest=a[0];
    let lowest=a[0];
    let total=0
    for(let i=0;i<a.length;i++)
    {
        total+=a[i]['votes'];
        if(a[i]['votes']>highest['votes'])
        {
            highest=a[i];
        }
        else if(a[i]['votes']<lowest['votes'])
        {
            lowest=a[i];
        }
    }
    console.log(`The Highest votes among the Politicians is : ${highest['votes']}, and the Name of the Politician is ${highest['Name']}`);
    console.log(`The Lowest votes among the Politicians is : ${lowest['votes']}, and the Name of the Politician is ${lowest['Name']}`);
    console.log("The Average of votes among the Politicians is : ",total/a.length);
}

async function main()
{
    let s = new nPolitician();
    // s.input_n();
    // s.populate();
    // inserting_data(s);
    // find_max_min_avg();
    result = await reading_data();
    console.log(result);
    // deleting_data()
    // updating_data()

}

main();