const prompt = require('prompt-sync')();

class politician
{
    static incrementing_id=1
    constructor()
    {
        this.name;
        this.votes;
        this.money
        this.id;
    }
    input_politician_details(n)
    {
        console.log(`For politician ${n+1}`);
        this.name=prompt("Enter the Name: ");
        this.votes=Number(prompt("Enter the votes: "));
        this.money=Number(prompt("Enter the money:"));
        this.id=politician.incrementing_id;
        politician.incrementing_id += 1
    }
}

class npolitician
{
    constructor()
    {
        this.array=[];
        this.n;
    }
    input_n()
    {
        this.n=Number(prompt("Enter the Number of politicians: "));
    }
    populate()
    {
        for (let i=0;i<this.n;i++)
        {
            this.array[i]= new politician();
            this.array[i].input_politician_details(i);
        }
    }
}

const mongoose = require('mongoose')
database='Paltisian'
url=`mongodb+srv://meghan:meghan@practicecluster.dxjehc1.mongodb.net/${database}?retryWrites=true&w=majority`;

database = mongoose.connect(url)
console.log("Connected to Database")

const coll_schema = new mongoose.Schema(
    {
        Name:String,
        ID:Number,
        votes:Number,
        money:Number,
    }
)

const collection = new mongoose.model("politicians2",coll_schema);

// async function inserting_data()
// {
//     let name = prompt("Enter the Name of the politician: ");
//     let id = Number(prompt("Enter the ID of the politician: "));
//     let votes = Number(prompt("Enter the votes of the politician: "));
//     document = await new collection({
//         Name:name,
//         ID:id,
//         votes:votes
//     })
//     await document.save();
//     await console.log("Document Inserted");
// }
async function inserting_data(s)
{
    for(let i=0;i<s.n;i++)
    {
        let doc = new collection(
            {
                Name:s.array[i].name,
                ID:s.array[i].id,
                votes:s.array[i].votes,
                money:s.array[i].money,
            }
        )
        await doc.save();
    }
    await console.log("Inserted Documents");
}
// inserting_data()

async function reading_data()
{
    // let name = prompt("Enter the Name of the politician: ");
    // result = await collection.find({Name:`${name}`});
    result = await collection.find();
    return result
}
// reading_data();

async function updating_data()
{
    let id = Number(prompt("Select ID of the politician: "));
    let revisedmoney = prompt("Enter the Revised Money of the politician: ");
    await collection.updateOne({ID:id},{$set:{money:revisedmoney}});
    await console.log("Updated the Record")
    result = await collection.find({ID:id});
    await console.log(result);
}
// updating_data();

async function deleting_data()
{
    let id = Number(prompt("Select ID of the politician: "));
    await collection.deleteOne({ID:id});
    await console.log("Deleted Record");
}
// deleting_data();


async function main()
{
    let s = new npolitician();
    // s.input_n();
    // s.populate();
    // inserting_data(s);
    // find_max_min_avg();
    // deleting_data()

    // result = await reading_data();
    // console.log(result);

    updating_data()
}
main();