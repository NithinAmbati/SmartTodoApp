
const mainUrl="http://localhost:8000";

const getAllTasks=async()=> {
    const options={
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };
    const url=`${mainUrl}/tasks`;
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


const addNewTask=async(task)=>{
    const options={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({task})
    }
    const url=`${mainUrl}/tasks`;
    try {
        const response=await fetch(url, options);
        const {message}=await response.json();
        alert(message);
    } catch (error) {
        alert(error.message);
    }
}


const editTask=async(task)=>{
    const options={
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({task})
    }
    const url=`${mainUrl}/tasks`;
    try {
        const response=await fetch(url, options);
        const {message}=await response.json();
        alert(message)
    } catch (error) {
        alert(error.message);
    }
}

const deleteTask=async(id)=> {
    const options={
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const url=`${mainUrl}/tasks/${id}`;
    try {
        const response=await fetch(url, options);
        const {message}=await  response.json();
        alert(message);
    } catch (error) {
        alert(error.message);
    }
}

export { getAllTasks, addNewTask, editTask, deleteTask };
