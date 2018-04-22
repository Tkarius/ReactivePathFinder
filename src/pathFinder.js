// Our pathfinding algorithm is based on Djikstra's weighted shortest path algorithm.

// a queue of all the nodes in the graph. probably objects with coordinates.
var unvisited = [];

// a set of already visited nodes.
var visited = {};

// distances from nodes to the end node are stored here.
// These are in form:
// distance = {
//   'x2y3' = 3,
//   'x1y4' = 57
//}
var distance = {};

// previous node in the optimal path for each node.
var previous = {}

// the actual data structure we want to travel. This should be given in the following form:
// graph = {
// 'x2y2': {'x1y2': 1, 'x2y1': 1, 'x3y2': 1, 'x2y3': 1}
//}
// so that each graph entry includes information about all available paths and their weighs from
// that particular node to the adjacent node.
// For obstacles, we just need to remove the possible routes.
var graph = {}

// Starting and ending points for our path.
var startPoint = '';
var endPoint = '';

// mockup of the algorithm
// we assume that graph has been built and that start- and endpoints have their values set.
function Dijkstra(graph, startPoint, endPoint) {
    // set all distances to infinity in the beginning.
    for (node in graph) {
        previous[node] = undefined;
        distance[node] = Infinity;
    }
    // set distance of starting point to 0.
    distance[startPoint] = 0;

    // set visited nodes empty
    visited = []

    // while Q is non-empty
    while (unvisited.length) {
        // select the node with the least distance to be handled next.
        let curNode = minDist(distance);
        // remove current node from unvisited
        unvisited.splice(unvisited.indexOf(curNode), 1);

        // CHECK IF WE ARE ALREADY AT THE END
        if (curNode === endPoint) {

        }

        for (neighbour in graph[node]) {
            let newDistance = distance[curNode] + graph[neighbour][curNode];
            if (newDistance < distance[neighbour]) {
                distance[neighbour] = newDistance;
                previous[neighbour] = curNode;
            }
        }
    }
    console.log("Dijkstra algorithm completed. Distance and previous data structures updated.")
}

// returns
function minDist(dist) {
    let minDist = Infinity;
    let minDistNode = '';
    for (node in dist) {
        if (dist[node] < minDist) {
            minDist = dist[node];
            minDistNode = node;
        }
    }
    return minDistNode;
}
