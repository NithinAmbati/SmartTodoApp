
const mainUrl="http://localhost:8000";

const getTodoList=async()=> {
    const options={
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };
    const url=`${mainUrl}/todos`;
    const response=await fetch(url, options);
    if(response.ok) {
        const {data, message}=await response.json();
        console.log(message);
        return data;
    }
    const {message}=await response.json();
    console.log(message);
    return [];
}


const addNewTask=async(todo)=>{
    const options={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todo})
    }
    const url=`${mainUrl}/todos`;
    try {
        const response=await fetch(url, options);
        const {message}=await response.json();
        alert(message);
    } catch (error) {
        alert(error.message);
    }
}

export { getTodoList, addNewTask };
