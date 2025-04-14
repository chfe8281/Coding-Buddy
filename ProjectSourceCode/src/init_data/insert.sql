INSERT INTO coding_questions(name, topic, description, input_1, output_1, starter_code) 
VALUES('Largest Element', 
'1300', 
'Purpose:
The purpose of the find_largest_element function is to identify and return the largest element from a given array of integers.
Declaration:
int find_largest_element(int* arr, int& size);
Parameters:
arr (int[]): A pointer to the first element of the integer array.
size (int): The size of the array.
Returns:
The function returns an integer representing the largest element found in the array.
Behavior:
The function iterates through the array from the first to the last element.
It keeps track of the largest element encountered during the iteration.
Once the entire array is traversed, the largest element is returned.
Edge Cases:
If the array is empty (i.e., size is zero), the function should ideally return a default value or handle this case with error handling.
If all elements are equal, the function will return that element as the largest.
Negative numbers are handled as well, and the function will return the largest negative number if its the greatest element in the array.',
'int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};  // Example array
    int size = sizeof(arr) / sizeof(arr[0]);  // Calculate the size of the array

    int largest = find_largest_element(arr, size);  // Call the function
    cout << "The largest element in the array is: " << largest << endl;

    int arr1[] = {-3, -1, -4, -7, -2};  // Example with negative numbers
    int size1 = sizeof(arr1) / sizeof(arr1[0]);  // Calculate the size of the array
    int largest1 = find_largest_element(arr1, size1);  // Call the function
    cout << "The largest element in the second array is: " << largest1 << endl;

    int arr2[] = {5, 12, 9, 20, 7};  // Example with all positive numbers
    int size2 = sizeof(arr2) / sizeof(arr2[0]);  // Calculate the size of the array
    int largest2 = find_largest_element(arr2, size2);  // Call the function
    cout << "The largest element in the third array is: " << largest2 << endl;

    return 0;
}', 
'"The largest element in the array is: 9\nThe largest element in the second array is: -1\nThe largest element in the third array is: 20\n"',
'#include <iostream>

using namespace std;

int find_largest_element(int arr[], int size) {
    // Begin your solution here
}'), 

('Array Doubling', 
'2270',
'Description', 
'// Function to print the array
void printArray(int* arr, int size) {
    for (int i = 0; i < size; ++i) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    // Initial array
    int size1 = 3;
    int* arr1 = new int[size1]{1, 2, 3};

    cout << "Original array: ";
    printArray(arr1, size1);

    // Double the size of the array
    arr1 = doubleArraySize(arr1, size1);

    cout << "Doubled array: ";
    printArray(arr1, size1);

    // Clean up dynamically allocated memory
    delete[] arr1;
    int size2 = 5;
    int* arr2 = new int[size2]{1, 2, 3, 4, 5};

    cout << "Original array: ";
    printArray(arr2, size2);

    // Double the size of the array
    arr2 = doubleArraySize(arr2, size2);

    cout << "Doubled array: ";
    printArray(arr2, size2);

    // Clean up dynamically allocated memory
    delete[] arr2;
     int size3 = 0;
    int* arr3 = new int[size3]{};

    cout << "Original array: ";
    printArray(arr3, size3);

    // Double the size of the array
    arr3 = doubleArraySize(arr3, size3);

    cout << "Doubled array: ";
    printArray(arr3, size3);

    // Clean up dynamically allocated memory
    delete[] arr3;

    return 0;
}', 
'"Original array: 1 2 3 \nDoubled array: 1 2 3 0 0 0 \nOriginal array: 1 2 3 4 5 \nDoubled array: 1 2 3 4 5 0 0 0 0 0 \nOriginal array: \nDoubled array: \n"','{Starter Code Here...}'),
('Graph Traversal - BFS', 
'3104', 
'Purpose:
The purpose of the bfs_traversal function is to perform a breadth-first traversal on a graph and return the order in which the nodes are visited.

Declaration:
vector<int> bfs_traversal(int V, vector<vector<int>>& adj, int start);

Parameters:
V (int): Number of vertices in the graph (0-indexed).
adj (vector<vector<int>>): Adjacency list representation of the graph.
start (int): Starting vertex for BFS.

Returns:
A vector containing the nodes in the order they are visited during BFS traversal.

Behavior:
The function uses a queue to traverse the graph level by level from the start node.
Visited nodes are marked to avoid repetition.
The order of nodes visited is stored and returned.

Edge Cases:
- If the graph has no nodes (V = 0), the function should return an empty traversal.
- If the start node has no edges, the function should return just the start node.
- The graph may be disconnected. Only the connected component of the start node is traversed.',
'int main() {
    // Test Case 1: Normal BFS Traversal
    int V = 6;
    vector<vector<int>> adj = {
        {1, 2},     // Neighbors of node 0
        {0, 3},     // 1
        {0, 3},     // 2
        {1, 2, 4},  // 3
        {3, 5},     // 4
        {4}         // 5
    };

    vector<int> result = bfs_traversal(V, adj, 0);
    for (int node : result) {
        cout << node << " ";
    }
    cout << endl;

    // Test Case 2: Disconnected node
    V = 1;
    vector<vector<int>> adj2 = {{}};
    result = bfs_traversal(V, adj2, 0);
    for (int node : result) {
        cout << node << " ";
    }
    cout << endl;

    // Test Case 3: Edge Case 1 - Graph with no nodes (V = 0)
    V = 0;
    vector<vector<int>> adj3 = {};
    result = bfs_traversal(V, adj3, 0);
    for (int node : result) {
        cout << node << " ";
    }
    cout << endl;

    return 0;
}', 
'"0 1 2 3 4 5 \n0 \n\n"', 
'#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> bfs_traversal(int V, vector<vector<int>>& adj, int start) {
    // Begin your solution here
}'), 
('Graph Traversal - DFS', 
'3104', 
'Purpose:
The purpose of the dfs_traversal function is to perform a depth-first traversal on a graph and return the order in which the nodes are visited.

Declaration:
vector<int> dfs_traversal(int V, vector<vector<int>>& adj, int start);

Parameters:
V (int): Number of vertices in the graph (0-indexed).
adj (vector<vector<int>>): Adjacency list representation of the graph.
start (int): Starting vertex for DFS.

Returns:
A vector containing the nodes in the order they are visited during DFS traversal.

Behavior:
The function uses recursion to traverse the graph depth-wise from the start node.
Visited nodes are marked to avoid cycles.
The traversal order is stored and returned.

Edge Cases:
- If the graph has no nodes (V = 0), the function should return an empty traversal.
- If the start node has no edges, the function should return just the start node.
- The graph may be disconnected. Only the connected component of the start node is traversed.',
'int main() {
    int V = 6;
    vector<vector<int>> adj = {
        {1, 2},     // Neighbors of node 0
        {0, 3},     // 1
        {0, 3},     // 2
        {1, 2, 4},  // 3
        {3, 5},     // 4
        {4}         // 5
    };

    vector<int> result = dfs_traversal(V, adj, 0);
    for (int node : result) {
        cout << node << " ";
    }
    cout << endl;

    // Edge case: Disconnected node
    V = 1;
    vector<vector<int>> adj2 = {{}};
    result = dfs_traversal(V, adj2, 0);
    for (int node : result) {
        cout << node << " ";
    }
    cout << endl;
    // Test Case 3: Cyclic graph (Edge case)
    V = 4;
    vector<vector<int>> adj3 = {
        {2, 1},    // 0 -> 2, 1 (Change the order here)
        {0, 3},    // 1 -> 0, 3
        {0, 3},    // 2 -> 0, 3
        {1, 2}     // 3 -> 1, 2 (Cycle between 1, 2, and 3)
    };
    
    result = dfs_traversal(V, adj3, 0);
    for (int node : result) {
        cout << node << " ";
    }
    cout << endl;

    return 0;
}', 
'"0 1 3 2 4 5 \n0 \n0 2 3 1 \n"', 
'#include <iostream>
#include <vector>
#include <stack>

using namespace std;

void dfs_helper(int node, vector<vector<int>>& adj, vector<bool>& visited, vector<int>& result) {
    // Begin your solution here
}
vector<int> dfs_traversal(int V, vector<vector<int>>& adj, int start) {
    // Begin your solution here
}');


-- test for completed questions calculation
INSERT INTO
users_to_coding_questions(user_id, question_id, time_taken)
VALUES(1,1,1);

