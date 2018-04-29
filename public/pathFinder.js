// Our pathfinding algorithm is based on Djikstra's weighted shortest path algorithm.
// We'll be using the classic version of the algorithm rather than the one using priority queues.
// Our graphs are relatively simple and this shouldn't have too much of an effect on processing
// times.

// a queue of all the nodes in the graph. probably objects with coordinates.
var unvisited = [];

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

// we assume that graph has been built and that start- and endpoints have their values set.
function dijkstra(graph, unvisited, startPoint, endPoint) {
    // set all distances to infinity in the beginning.
    for (node in graph) {
        previous[node] = undefined;
        distance[node] = Number.MAX_VALUE;
    }
    // set distance of starting point to 0.
    distance[startPoint] = 0;

    // while unvisited is non-empty
    while (unvisited.length) {
        // select the node with the least distance to be handled next.
        let curNode = minDist(distance);
        // remove current node from unvisited
        unvisited.splice(unvisited.indexOf(curNode), 1);

        // CHECK IF WE ARE ALREADY AT THE END
        if (curNode === endPoint) {
            // break out of while?
            // doublecheck logic for this. if true, just do the following for if !=.
        }

        for (neighbour in graph[node]) {
            let newDistance = distance[curNode] + graph[neighbour][curNode];
            if (newDistance < distance[neighbour]) {
                distance[neighbour] = newDistance;
                previous[neighbour] = curNode;
            }
        }
    }
    console.log("Dijkstra algorithm completed. Distance[] and previous[] data structures updated.")
}

// Returns the closest path from startPoint to endPoint.
// Assumes that previous[] is set by the Dijkstra algorithm for the current points.
function getPath() {
    let path = [];
    curNode = endPoint;
    while (curNode != startPoint) {
        // add current node as the first element of the path.
        path.unshift(curNode);
        curNode = previous[curNode];
    }
    path.unshift(curNode);
    return path;
}

// returns reference to the node with the current minimum distance.
function minDist(dist) {
    let minDist = Number.MAX_VALUE;
    let minDistNode = '';
    for (node in dist) {
        if (dist[node] < minDist && unvisited.indexOf(node) > -1) {
            minDist = dist[node];
            minDistNode = node;
        }
    }
    return minDistNode;
}

// driver function for the algorithm.
function buildPath(requestedNodes, requestedGraph, requestedStartPoint, requestedEndPoint) {
    unvisited = requestedNodes;
    graph = requestedGraph;
    startPoint = requestedStartPoint;
    endPoint = requestedEndPoint;
    dijkstra();
    return getPath();
}
