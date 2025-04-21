/*--------Begin Flashcard Defaults--------*/
-- Create an admin user to assign default decks to
INSERT INTO users (name, username, password, email)
  VALUES ('Admin', 'admin', '$2a$10$UDl9WT1/9C68T5xvP/cldus/rUcFC8wkXc435KBrBQmJGiuoeTcIO', 'admin42@colorado.edu');
  -- hashed password is "password987"

-- Default flashcard decks
INSERT INTO decks (name, count, creator_id)
  VALUES ('CSCI 1300', 0, 1),
  ('CSCI3308',3, 1);

-- Default flashcards
INSERT INTO cards (front, back, creator_id)
  VALUES ('Unit testing', 'A type of testing that checks individual segments of code works in isolation', 1),
  ('Regression Testing', 'A type of testing that checks new code does not break previous code', 1),
  ('User Acceptance Testing', 'A type of testing that involves the user (usually customer) and ensures it meets their expectations', 1);

-- Connect cards to decks
INSERT INTO decks_to_cards (deck_id, card_id)
  VALUES (2, 1),
  (2,2),
  (2,3);
-- Connect cards to admin
INSERT INTO users_to_decks (user_id, deck_id)
  VALUES (1,1);

/* Begin Coding Questions */
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
}'), ('Greatest Pair Sum', 
'1300', 
'Purpose:
The purpose of the greatestPairSum function is to identify and return the greatest sum made by any pairing out of a given array of non-negative integers.
Declaration:
int greatestPairSum(int* arr, int& size);
Parameters:
arr (int[]): A pointer to the first element of the integer array.
size (int): The size of the array.
Returns:
The function returns an integer representing the largest pair sum found in the array.
Behavior:
The function iterates through the array from the first to the last element.
It sums the current element with every element after it, compares and stores the greatest.
Once the entire array is traversed, the largest pair sum is returned.
Edge Cases:
If the array is empty (i.e., size is zero), the function should return zero.
Negative numbers are handled as well, and the function will return the largest negative pair sum if it is the greatest pair sum in the array.',
'int main() {
    int arr[] = {5, 9, 8, 2, 5, 1, 7, 4, 5};  // Example array
    int size = sizeof(arr) / sizeof(arr[0]);  // Calculate the size of the array

    int largest = greatestPairSum(arr, size);  // Call the function
    cout << "The largest pair sum in this array is: " << largest << endl;

    int arr1[] = {-2, -1, -3, -6, -2};  // Example with negative numbers
    int size1 = sizeof(arr1) / sizeof(arr1[0]);  // Calculate the size of the array
    int largest1 = greatestPairSum(arr1, size1);  // Call the function
    cout << "The largest pair sum in the second array is: " << largest1 << endl;

    int arr2[] = {};  // Edge Case
    int size2 = sizeof(arr2) / sizeof(arr2[0]);  // Calculate the size of the array
    int largest2 = greatestPairSum(arr2, size2);  // Call the function
    cout << "The largest pair sum in the third array is: " << largest2 << endl;

    return 0;
}', 
'"The largest pair sum in this array is: 17\nThe largest pair sum in the second array is: -3\nThe largest pair sum in the third array is: 0\n"',
'#include <iostream>
#include<climits>

using namespace std;

int greatestPairSum(int arr[], int size) {
    // Begin your solution here
}'),
('Check Odd', '1300', 
'Purpose: 
Check if the integer input is odd. 
Declaration: 
bool isOdd(int num);
Parameters: 
One integer input int num. 
Returning: 
A boolean value, true if odd, false if even.
Edge Cases: 
None.', 'int main() {
    // Test Case 1
    int test1 = 3;
    std::cout << "Test 1: " << test1 << " is " << (isOdd(test1) ? "odd" : "even") << std::endl;

    // Test Case 2
    int test2 = 10;
    std::cout << "Test 2: " << test2 << " is " << (isOdd(test2) ? "odd" : "even") << std::endl;

    // Test Case 3
    int test3 = -7;
    std::cout << "Test 3: " << test3 << " is " << (isOdd(test3) ? "odd" : "even") << std::endl;

    return 0;
}', '"Test 1: 3 is odd\nTest 2: 10 is even\nTest 3: -7 is odd\n"', '#include <iostream>

bool isOdd(int num) {
    // Begin your solution here
}'), 
('Calculator', '1300', 
'Purpose: 
Make a function that utilizes a switch statement to perform an operation on two integers. 
Declaration: 
float calculate(int num_1, int num_2, char op);
Parameters: 
int num_1, int num_2, and char operator. 
Returning: 
A float containing the result. 
Edge Cases: 
If result is not possible return 0.', 'int main() {
    // Test Case 1: Addition
    string ops = "+/%";
    cout << "Test Case 1: 10 + 5 = " << calculate(10, 5, ops[0]) << endl;

    // Test Case 2: Division by zero
    cout << "Test Case 2: 10 / 0 = " << calculate(10, 0, ops[1]) << endl;

    // Test Case 3: Invalid operator
    cout << "Test Case 3: 10 % 5 = " << calculate(10, 5, ops[2]) << endl;

    return 0;
}', '"Test Case 1: 10 + 5 = 15\nTest Case 2: 10 / 0 = Error: Division by zero. Returning 0.\n0\nTest Case 3: 10 % 5 = Error: Invalid operator. Returning 0.\n0\n"', '#include <iostream>
using namespace std;

// Function to perform calculation using switch
float calculate(int num_1, int num_2, char op) {
    // Begin your solution here
}'),
('Array Doubling', 
'2270',
'Purpose: 
The doubleArraySize function takes a dynamically allocated array and doubles it in size. The function should double the original size of the array and return the new doubled array as a pointer.
Declaration: 
int* doubleArraySize(int* arr, int &size);
Parameters: 
int* arr- a pointer to the original array, int &size - the original size of the array, passed by reference. 
Returning: 
A new int* which is a pointer to the new doubled array.
Edge Cases: 
If the array is of size = 0 to begin with, then return an array of size = 0;', 
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
'"Original array: 1 2 3 \nDoubled array: 1 2 3 0 0 0 \nOriginal array: 1 2 3 4 5 \nDoubled array: 1 2 3 4 5 0 0 0 0 0 \nOriginal array: \nDoubled array: \n"',
'#include <iostream>

using namespace std;

int* doubleArraySize(int* arr, int &size) {
    // Begin your solution here
}'), 
('Reverse a Singly Linked List', '2270', 
'Purpose: 
Given a struct for a linked list node and a function to create the singly linked list, write the function reverseList to reverse the nodes in the singly linked list. 
Declaration: 
ListNode* reverseList(ListNode* head);
Parameters: 
The current head of the linked list, ListNode* head. 
Returning: 
The new head of the reversed linked list.
Edge Cases:
If linked list is empty, return an empty linked list.',
'void printList(ListNode* head) {
    while (head != nullptr) {
        cout << head->val << " ";
        head = head->next;
    }
    cout << endl;
}

int main() {
    // Test case 1
    int arr1[] = {1, 2, 3, 4, 5};
    ListNode* list1 = createList(arr1, 5);
    cout << "Original List 1: ";
    printList(list1);
    ListNode* reversed1 = reverseList(list1);
    cout << "Reversed List 1: ";
    printList(reversed1);

    // Test case 2
    int arr2[] = {10, 20, 30};
    ListNode* list2 = createList(arr2, 3);
    cout << "Original List 2: ";
    printList(list2);
    ListNode* reversed2 = reverseList(list2);
    cout << "Reversed List 2: ";
    printList(reversed2);

    // Test case 3
    int arr3[] = {42};
    ListNode* list3 = createList(arr3, 1);
    cout << "Original List 3: ";
    printList(list3);
    ListNode* reversed3 = reverseList(list3);
    cout << "Reversed List 3: ";
    printList(reversed3);

    return 0;
}', '"Original List 1: 1 2 3 4 5 \nReversed List 1: 5 4 3 2 1 \nOriginal List 2: 10 20 30 \nReversed List 2: 30 20 10 \nOriginal List 3: 42 \nReversed List 3: 42 \n"', '#include <iostream>
using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

// Function to reverse a linked list
ListNode* reverseList(ListNode* head) {
    // Begin your solution here...
    return nullptr;
}

// Helper to create linked list from array
ListNode* createList(const int arr[], int size) {
    if (size == 0) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* current = head;
    for (int i = 1; i < size; i++) {
        current->next = new ListNode(arr[i]);
        current = current->next;
    }
    return head;
}'),('Valid Parentheses', '2270', 
'Purpose: 
Create a function that uses a stack to check if an input has valid parentheses. Valid parentheses means that the type of parentheses is opened and closed in order, so [()] is valid, [(]) is not valid. 
Declaration: 
bool isValid(string s);
Parameters: 
The input string s. 
Returning: 
A boolean value, true if valid false if not.
Edge Cases:
None.', 
'int main() {
    // Test case 1
    string test1 = "()[]{}";
    cout << "Test 1: " << test1 << " → " << (isValid(test1) ? "Valid" : "Invalid") << endl;

    // Test case 2
    string test2 = "([)]";
    cout << "Test 2: " << test2 << " → " << (isValid(test2) ? "Valid" : "Invalid") << endl;

    // Test case 3
    string test3 = "{[()]}";
    cout << "Test 3: " << test3 << " → " << (isValid(test3) ? "Valid" : "Invalid") << endl;

    return 0;
}', '"Test 1: ()[]{} → Valid\nTest 2: ([)] → Invalid\nTest 3: {[()]} → Valid\n"', '#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    // Begin your solution here...
    return false;
}'),('Computer Network Infection', '2270', 
'Purpose: 
Given a network of computers with each computer stored in a cell of a 2x2 matrix, there is one infected computers. For each infected computer each minute it infects all of its direct neighbors. How many minutes until all of the computers are infected? 
Declaration:
int timeToInfectAll(int n, int** edges, int edgeCount, int start);
Parameters: 
int n (size of matrix), int **edges (an array of groups of edges), int edgeCount (number of edges), int start (index of the first infected computer). 
Returning: 
int minutes, time it takes for all computers to be infected. 
Edge Case:
If not all computers can be infected, return -1. ', 
'int main() {
    // Edge list for the network
    int edges1[][2] = {{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}};
    int** edgeList1 = new int*[5];
    for (int i = 0; i < 5; i++) {
        edgeList1[i] = edges1[i];
    }
    cout << "Time to infect all: " << timeToInfectAll(6, edgeList1, 5, 0) << endl; // Output: 5

    // Edge list for a disconnected network
    int edges2[][2] = {{0, 1}, {2, 3}};
    int** edgeList2 = new int*[2];
    for (int i = 0; i < 2; i++) {
        edgeList2[i] = edges2[i];
    }
    cout << "Time to infect all: " << timeToInfectAll(4, edgeList2, 2, 0) << endl; // Output: -1 (2 and 3 are disconnected)

    int edges3[][2] = {{0,1}, {0,2}, {0,3}, {0,4}};
    int** edgeList3 = new int*[4];
    for (int i = 0; i < 4; i++) {
        edgeList3[i] = edges3[i];
    }

    cout << "Time to infect all: " << timeToInfectAll(5, edgeList3, 4, 2) << endl; // Output: 2

    delete[] edgeList3;
    // Clean up the dynamic edge lists
    delete[] edgeList1;
    delete[] edgeList2;

    return 0;
}', '"Time to infect all: 5\nTime to infect all: -1\nTime to infect all: 2\n"', '#include <iostream>
#include <queue>
using namespace std;

int timeToInfectAll(int n, int** edges, int edgeCount, int start) {
    // Begin your solution here...
    return 0;
}
'),('Count Set Bits', '2400', 
'Purpose: 
Write a function countSetBits which returns the number of set bits (1 bits) in the integer input. 
Declaration:
int countSetBits(int n);
Parameters: 
integer input n. 
Returning: 
int count which is the number of set bits.
Edge Cases:
None.', 
'int main() {
    int num1 = 13;     // Binary: 1101 → Set bits: 3
    int num2 = 0;      // Binary: 0000 → Set bits: 0
    int num3 = 255;    // Binary: 11111111 → Set bits: 8

    cout << "Set bits in " << num1 << ": " << countSetBits(num1) << endl;
    cout << "Set bits in " << num2 << ": " << countSetBits(num2) << endl;
    cout << "Set bits in " << num3 << ": " << countSetBits(num3) << endl;

    return 0;
}', '"Set bits in 13: 3\nSet bits in 0: 0\nSet bits in 255: 8\n"', '#include <iostream>
using namespace std;

// Function to count set bits
int countSetBits(int n) {
    return 0;
}'),
('Memcpy Implementation', '2400', 
'Purpose: 
Implement a custom version of the memcpy function, which copies a specified number of bytes from a source memory block to a destination memory block.
Declaration: 
void* my_memcpy(void* dest, const void* src, size_t n);
Parameters: 
void* dest, const void* src, size_t n.
Returning:
Nothing, only switch the pointers.
Edge Cases:
If src = dest, then that should remain the same after the function call.', 'int main() {
    // Test Case 1: Copy a C-style string
    char src1[] = "Test 1";
    char dest1[10];
    my_memcpy(dest1, src1, sizeof(src1));
    std::cout << "Test 1 - Copied string: " << dest1 << std::endl;

    // Test Case 2: Copy an array of integers
    int src2[] = {1, 2, 3, 4, 5};
    int dest2[5] = {0};
    my_memcpy(dest2, src2, sizeof(src2));
    std::cout << "Test 2 - Copied int array: ";
    for (int i : dest2) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    // Test Case 3: Copy part of a string
    const char* src3 = "Hello, world!";
    char dest3[6] = {};
    my_memcpy(dest3, src3, 5);  // Copy only "Hello"
    dest3[5] = {0};            // Null-terminate manually
    std::cout << "Test 3 - Partial copy: " << dest3 << std::endl;

    return 0;
}', '"Test 1 - Copied string: Test 1\nTest 2 - Copied int array: 1 2 3 4 5 \nTest 3 - Partial copy: Hello\n"', '#include <iostream>
#include <cstring> // For comparison with std::memcmp

void* my_memcpy(void* dest, const void* src, size_t n) {
    // Begin your solution here
}'), 
('IsTMax', '2400', 
'Purpose: 
Write a function to verify if the integer input is TMax. 
Declaration:
bool isTMax(int num);
Parameters:
int num (input integer).
Returning:
A boolean, true if the input is TMax, false if otherwise.
Edge Cases:
None.', 'int main() {
    // Test Case 1: Check for TMax
    int test1 = (1 << (sizeof(int) * 8 - 1)) - 1; // TMax for a 32-bit int
    std::cout << "Test 1: " << (isTMax(test1) ? "TMax" : "Not TMax") << std::endl;

    // Test Case 2: Check for a value smaller than TMax
    int test2 = 100;
    std::cout << "Test 2: " << (isTMax(test2) ? "TMax" : "Not TMax") << std::endl;

    // Test Case 3: Check for a negative value
    int test3 = -1;
    std::cout << "Test 3: " << (isTMax(test3) ? "TMax" : "Not TMax") << std::endl;

    return 0;
}', '"Test 1: TMax\nTest 2: Not TMax\nTest 3: Not TMax\n"', '#include <iostream>

bool isTMax(int num) {
    // Begin your solution here
}'), ('Translate x86 Assembly', '2400', 
'Purpose: Looking at the assembly code below write the same function in C++.
Declaration: 
bool mysteryFunction(int n); 
Parameters: 
An integer value n. 
Returning: a boolean value. 
Assembly: 
".global mysteryFunctionAsm\n"
"mysteryFunctionAsm:\n"
"    test %rdi, %rdi\n"
"    test $1, %rdi\n"
"    sete %al\n"
"    movzx %al, %eax\n"
"    ret\n"
Edge Cases:
None.', 'int main() {
    int num = 42;
    int num_two = 39;
    int num_three = 0;
    cout << "num_one " << (mysteryFunction(num) ? "Passes" : "Fails") << endl;
    cout << "num_two " << (mysteryFunction(num_two) ? "Fails" : "Passes") << endl;
    cout << "num_three " << (mysteryFunction(num_three) ? "Passes" : "Fails") << endl;
    return 0;
}', '"num_one Passes\nnum_two Passes\nnum_three Passes\n"', '#include <iostream>
using namespace std;

bool mysteryFunction(int n) {
    return false;
}'),
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
}'), ('Divide & Conquer - Merge Sort', 
'3104', 
'Purpose:
The purpose of the mergeSort function is to sort an array of integers in ascending order using the Merge Sort algorithm.

Declaration:
void mergeSort(int* arr, int left, int right);

Parameters:
arr (int[]): A pointer to the first element of the integer array.
left (int): The starting index of the array/subarray.
right (int): The ending index of the array/subarray.

Returns:
The function does not return anything but modifies the array in-place to sort it.

Edge Cases:
- If the array is empty (size 0), the function should handle it gracefully without performing any operations.
- If the array contains only one element, it should remain unchanged.
- If the array is already sorted, it should stay unchanged.
- If the array is reverse sorted, it should be sorted correctly.',
'int main() {
    int arr[] = {5, 3, 8, 4, 2};  
    int size = sizeof(arr) / sizeof(arr[0]);
    mergeSort(arr, 0, size - 1);
    for(int i = 0; i < size; i++) cout << arr[i] << " ";
    cout << endl;

    int arr1[] = {};  // Empty array
    int size1 = sizeof(arr1) / sizeof(arr1[0]);
    mergeSort(arr1, 0, size1 - 1);
    for(int i = 0; i < size1; i++) cout << arr1[i] << " ";
    cout << endl;

    int arr2[] = {42};  // Single-element array
    int size2 = sizeof(arr2) / sizeof(arr2[0]);
    mergeSort(arr2, 0, size2 - 1);
    for(int i = 0; i < size2; i++) cout << arr2[i] << " ";
    cout << endl;

    int arr3[] = {1, 2, 3, 4};  // Already sorted array
    int size3 = sizeof(arr3) / sizeof(arr3[0]);
    mergeSort(arr3, 0, size3 - 1);
    for(int i = 0; i < size3; i++) cout << arr3[i] << " ";
    cout << endl;

    int arr4[] = {9, 7, 5, 3, 1};  // Reverse sorted array
    int size4 = sizeof(arr4) / sizeof(arr4[0]);
    mergeSort(arr4, 0, size4 - 1);
    for(int i = 0; i < size4; i++) cout << arr4[i] << " ";
    cout << endl;

    return 0;
}', 
'"2 3 4 5 8 \n\n42 \n1 2 3 4 \n1 3 5 7 9 \n"',
'#include <iostream>

using namespace std;

void merge(int arr[], int left, int mid, int right) {
    // Helper function to merge two halves
}

void mergeSort(int arr[], int left, int right) {
    // Begin your solution here
}'),('Divide & Conquer - Quick Sort', 
'3104', 
'Purpose:
The purpose of the quickSort function is to sort an array of integers in ascending order using the Quick Sort algorithm.

Declaration:
void quickSort(int* arr, int low, int high);

Parameters:
arr (int[]): A pointer to the first element of the integer array.
low (int): The starting index of the subarray.
high (int): The ending index of the subarray.

Returns:
The function modifies the array in-place to sort it. It does not return any value.

Edge Cases:
- An empty array should remain unchanged.
- A single-element array is already sorted and should not be modified.
- An array with all identical elements should remain unchanged.
- A reverse sorted array should be sorted correctly.
- Large arrays should be handled efficiently.',
'int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int size = sizeof(arr)/sizeof(arr[0]);
    quickSort(arr, 0, size - 1);
    for(int i = 0; i < size; i++) cout << arr[i] << " ";
    cout << endl;

    int arr1[] = {}; // Empty array
    int size1 = sizeof(arr1)/sizeof(arr1[0]);
    quickSort(arr1, 0, size1 - 1);
    for(int i = 0; i < size1; i++) cout << arr1[i] << " ";
    cout << endl;

    int arr2[] = {42}; // Single-element array
    int size2 = sizeof(arr2)/sizeof(arr2[0]);
    quickSort(arr2, 0, size2 - 1);
    for(int i = 0; i < size2; i++) cout << arr2[i] << " ";
    cout << endl;

    int arr3[] = {5, 5, 5, 5}; // All identical elements
    int size3 = sizeof(arr3)/sizeof(arr3[0]);
    quickSort(arr3, 0, size3 - 1);
    for(int i = 0; i < size3; i++) cout << arr3[i] << " ";
    cout << endl;

    int arr4[] = {9, 7, 5, 3, 1}; // Reverse sorted array
    int size4 = sizeof(arr4)/sizeof(arr4[0]);
    quickSort(arr4, 0, size4 - 1);
    for(int i = 0; i < size4; i++) cout << arr4[i] << " ";
    cout << endl;

    return 0;
}', 
'"1 5 7 8 9 10 \n\n42 \n5 5 5 5 \n1 3 5 7 9 \n"',
'#include <iostream>

using namespace std;

int partition(int arr[], int low, int high) {
    // Helper function to partition the array
}

void quickSort(int arr[], int low, int high) {
    // Begin your solution here
}');



-- test for completed questions calculation
INSERT INTO
users_to_coding_questions(user_id, question_id, time_taken)
VALUES(1,1,1);

