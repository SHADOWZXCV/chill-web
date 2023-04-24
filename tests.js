// to register aliases I am using
require('module-alias/register')

// tests by order
const test_file_names_in_order = [
    "signup",
    "signin",
];

/**
 * Run tests init function.
 */
(() => {
    test_file_names_in_order.map(file_name => require(`./test/${file_name}.js`));
})();
