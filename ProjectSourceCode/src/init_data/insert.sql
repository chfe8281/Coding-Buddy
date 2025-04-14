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
}'), 
('Check Odd', '1300', 'Purpose: Check if the integer input is odd. Parameters: One integer input int num. Returning: A boolean value, true if odd, false if even.', 'int main() {
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
('Calculator', '1300', 'Purpose: Make a function that utilizes a switch statement to perform an operation on two integers. Parameters: int num_1, int num_2, and char operator. Returning: A float containing the result. If result is not possible return 0.', 'int main() {
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
'Purpose: The doubleArraySize function takes a dynamically allocated array and doubles it in size. The function should double the original size of the array and return the new doubled array as a pointer.Parameters: int* arr- a pointer to the original array, int &size - the original size of the array, passed by reference. Returning: A new int* which is a pointer to the new doubled array.', 
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
('Memcpy Implementation', '2400', 'Implement a custom version of the memcpy function, which copies a specified number of bytes from a source memory block to a destination memory block.', 'int main() {
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
('IsTMax', '2400', 'Write a function to verify if the integer input is TMax. Return a boolean, true if the input is TMax, false if otherwise.', 'int main() {
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
}');

-- test for completed questions calculation
INSERT INTO
users_to_coding_questions(user_id, question_id)
VALUES(1,1);

