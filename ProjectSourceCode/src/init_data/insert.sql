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
}');

-- test for completed questions calculation
INSERT INTO
users_to_coding_questions(user_id, question_id)
VALUES(1,1);

