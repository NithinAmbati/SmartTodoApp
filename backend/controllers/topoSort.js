

function topologicalSort(tasks) {
    const adjList = new Map();
    const inDegree = new Map();

    // Initialize graph structure
    tasks.forEach(task => {
        adjList.set(task._id.toString(), []);
        inDegree.set(task._id.toString(), 0);
    });

    // Build adjacency list & in-degree count
    tasks.forEach(task => {
        task.dependencies.forEach(dep => {
            adjList.get(dep.toString()).push(task._id.toString());
            inDegree.set(task._id.toString(), inDegree.get(task._id.toString()) + 1);
        });
    });

    // Kahn's Algorithm (BFS)
    const queue = [];
    const sortedOrder = [];

    // Find nodes with in-degree 0
    for (let [taskId, degree] of inDegree.entries()) {
        if (degree === 0) queue.push(taskId);
    }

    while (queue.length > 0) {
        const node = queue.shift();
        sortedOrder.push(node);

        adjList.get(node).forEach(neighbor => {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) queue.push(neighbor);
        });
    }

    if (sortedOrder.length !== tasks.length) {
        throw new Error("Graph has a cycle, topological sort not possible.");
    }

    return sortedOrder.map(id => tasks.find(task => task._id.toString() === id));
}

const topoSort=(tasks)=> {
    try {
        const sortedTasks = topologicalSort(tasks);
        return {sortedTasks, message: "Data retreived succesfully"}
    } catch (error) {
        return {sortedTasks: [], message: error.message}
    }
}

module.exports={topoSort}