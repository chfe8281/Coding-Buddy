INSERT INTO 
coding_questions(name, topic, description, input_1, output_1) 
VALUES('Largest Element', 
'1300', 
'Purpose:
The purpose of the findLargestElement function is to identify and return the largest element from a given array of integers.
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
'"The largest element in the array is: 9\nThe largest element in the second array is: -1\nThe largest element in the third array is: 20\n"'), 
('Array Doubling', 
'2270','Description', 
'int main() {
    // Test case 1: Initial array with size 3
    int size1 = 3;
    int *arr1 = new int[size1]{1, 2, 3};
    cout << "Original array 1: ";
    for (int i = 0; i < size1; ++i) {
        cout << arr1[i] << " ";
    }
    cout << endl;

    // Doubling the array
    arrDouble(arr1, size1);
    cout << "Doubled array 1: ";
    for (int i = 0; i < size1; ++i) {
        cout << arr1[i] << " ";
    }
    cout << endl;
    cout << "New size 1: " << size1 << endl;

    // Test case 2: Initial array with size 5
    int size2 = 5;
    int *arr2 = new int[size2]{1, 2, 3, 4, 5};
    cout << "Original array 2: ";
    for (int i = 0; i < size2; ++i) {
        cout << arr2[i] << " ";
    }
    cout << endl;

    // Doubling the array
    arrDouble(arr2, size2);
    cout << "Doubled array 2: ";
    for (int i = 0; i < size2; ++i) {
        cout << arr2[i] << " ";
    }
    cout << endl;
    cout << "New size 2: " << size2 << endl;

    // Test case 3: Initial array with size 0 (empty array)
    int size3 = 0;
    int *arr3 = nullptr;  // Empty array
    cout << "Original array 3 (size 0): No elements" << endl;

    // Doubling the array
    arrDouble(arr3, size3);
    cout << "Doubled array 3 (size 0): ";
    for (int i = 0; i < size3; ++i) {
        cout << arr3[i] << " ";
    }
    cout << endl;
    cout << "New size 3: " << size3 << endl;

    // Clean up
    delete[] arr1;
    delete[] arr2;
    delete[] arr3;

    return 0;
}', 
'"Original array 1: 1 2 3 \nDoubled array 1: 1 2 3 0 0 0 \nNew size 1: 6\nOriginal array 2: 1 2 3 4 5 \nDoubled array 2: 1 2 3 4 5 0 0 0 0 0 \nNew size 2: 10\nOriginal array 3 (size 0): No elements\nDoubled array 3 (size 0): \nNew size 3: 0\n"');