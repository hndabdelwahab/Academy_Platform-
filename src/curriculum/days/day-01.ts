import type { DayCurriculum } from '@/types';

export const day01: DayCurriculum = {
  dayNumber: 1,
  title: 'How Software Works',
  subtitle: "The Developer's Mental Model",
  topics: ['programming_fundamentals', 'python', 'code_reading'],
  estimatedHours: 4,
  objectives: [
    'Understand what happens when code runs — from source file to execution',
    'Distinguish between compiled and interpreted languages, static and dynamic typing',
    'Trace an ERP transaction end-to-end: frontend → API → backend → database',
    'Write your first Python script with variables and data types',
    'Read unfamiliar Python code and describe what it does',
    'Connect every concept to ERP/Odoo equivalents you already know',
  ],
  sections: [
    {
      id: 's1-runtime',
      title: 'What Is a Runtime? Why Do Programs Exist?',
      type: 'theory',
      content: {
        simpleExplanation: 'A program is a set of instructions written by a developer that tells a computer exactly what to do, step by step. Think of it like a recipe: the recipe (source code) is written in human-readable language, but the kitchen (computer) needs something to read the recipe and execute each step. That "something" is the runtime — the environment that actually runs your code. When you click "Confirm" on a Sales Order in Odoo, a program runs. When you run a SQL query, a program processes it. Everything in software is programs executing instructions.',
        professionalDefinition: 'A runtime environment is the infrastructure that executes program code, managing memory allocation, variable scope, function calls, and system resource access. It includes the interpreter or virtual machine, standard libraries, and execution context. Source code is transformed (compiled or interpreted) into operations the CPU can perform, with the runtime handling garbage collection, I/O, and error propagation.',
        whyItExists: 'Before high-level programming languages, developers wrote machine code — binary instructions directly understood by the CPU. This was error-prone and slow to write. Languages like Python, C#, and JavaScript were created to let humans write readable instructions that get translated into machine operations. The runtime exists to bridge the gap between human-readable code and machine execution, handling the complex low-level details automatically.',
        howItWorks: 'When you run a Python script: (1) The operating system locates the Python interpreter (python.exe). (2) The interpreter reads your .py file line by line. (3) Each line is parsed into an Abstract Syntax Tree (AST) — a structured representation. (4) The AST is compiled to bytecode (.pyc internally). (5) The Python Virtual Machine (PVM) executes bytecode instructions. (6) Each instruction manipulates memory (creating variables, calling functions). (7) Output is sent to stdout or return values propagate back through the call stack.',
        erpExample: 'When a warehouse user clicks "Validate Transfer" in an ERP system: Browser JavaScript sends HTTP POST → Odoo web controller receives request → Python model method runs business validation → ORM generates SQL UPDATE → PostgreSQL commits transaction → Response returns to browser → UI updates. Every step involves a runtime executing code.',
        odooConnection: 'Odoo itself runs on a Python runtime. When you start Odoo with `./odoo-bin`, you are launching the Python interpreter with Odoo\'s codebase loaded. Every button click in Odoo triggers Python methods running inside this runtime, which then interact with PostgreSQL through the ORM runtime layer.',
        realProjectRecognition: 'When you open an unknown project, look for: main.py or app.py (Python entry point), package.json scripts (Node.js), Program.cs (.NET), manage.py (Django/Odoo). The entry point tells you which runtime executes the project. Configuration files (requirements.txt, pyproject.toml, .csproj) reveal the runtime dependencies.',
        commonMistakes: [
          { wrong: 'Thinking the .py file itself runs on the computer', right: 'The Python interpreter reads and executes the .py file', explanation: 'The file is just text. The interpreter program must be installed and invoked to execute it.' },
          { wrong: 'Assuming code runs all at once like a document', right: 'Code executes sequentially, line by line, unless control flow changes order', explanation: 'Execution follows the call stack. Functions pause their caller until they return.' },
        ],
        debugging: [
          { errorType: 'FileNotFoundError / command not found', code: '$ python my_script.py\nbash: python: command not found', error: 'python: command not found', investigation: 'Check if Python is installed (python --version). On Windows, try py instead of python. Verify PATH environment variable.', fix: 'Install Python from python.org or use py launcher on Windows' },
        ],
        interviewTerminology: '"A runtime environment is the execution context that manages code execution, memory, and system interactions. In our ERP stack, Odoo runs on the Python runtime, which interprets our business logic and uses the ORM to interact with PostgreSQL. Understanding the runtime helps debug issues at the right layer — whether the problem is in our Python code, the ORM query generation, or the database itself."',
      },
      requiresAnswer: {
        question: 'In your own words: When a user clicks a button in Odoo, name at least 3 different "runtimes" or execution environments that process the request before the database is updated.',
        type: 'explain',
        hint: 'Think about: browser, web server, Python, database',
        modelAnswer: 'Browser JavaScript runtime handles the click event, the web server/HTTP layer routes the request, Python runtime executes Odoo model methods, and PostgreSQL executes the SQL queries.',
      },
    },
    {
      id: 's2-compiled-vs-interpreted',
      title: 'Compiled vs Interpreted Languages',
      type: 'comparison',
      content: {
        simpleExplanation: 'Some languages (C#, Java) are compiled — your entire program is translated to machine code BEFORE it runs, like translating a whole book before reading it. Other languages (Python, JavaScript) are interpreted — a translator reads and executes your code line by line as it runs, like a simultaneous interpreter at a conference. Both get the job done, but the process differs. ERP systems use both: Odoo backend is Python (interpreted), many ERP integrations use C# or Java (compiled).',
        professionalDefinition: 'Compiled languages transform source code into machine code or intermediate bytecode via a compiler before execution, enabling optimization and type checking at build time. Interpreted languages parse and execute source code at runtime through an interpreter, offering faster development cycles but typically slower execution. Hybrid approaches (Java bytecode, C# IL) compile to intermediate representation then JIT-compile at runtime.',
        whyItExists: 'Early computers only understood machine code. Compilers were invented to automatically translate human-readable code to machine instructions. Interpreters were invented later for flexibility — allowing interactive development, dynamic typing, and runtime code modification. Modern systems often blend both approaches.',
        howItWorks: 'Compiled (C#): Source → Compiler → IL bytecode → CLR/JIT → Native machine code → Execution. Errors caught at compile time. Interpreted (Python): Source → Interpreter reads line → Parse → Bytecode → PVM executes → Next line. Errors caught at runtime when that line executes.',
        syntax: [
          { piece: 'C# compilation', explanation: 'dotnet build compiles .cs files into a .dll assembly. dotnet run executes the compiled output.' },
          { piece: 'Python interpretation', explanation: 'python script.py — interpreter reads and executes each line immediately. No separate build step.' },
        ],
        codeExample: {
          language: 'python',
          code: `# This Python file runs directly — no compile step needed
# Save as hello_erp.py and run: python hello_erp.py

company_name = "Acme ERP Solutions"
active_users = 42
is_production = True

print(f"System: {company_name}")
print(f"Active users: {active_users}")
print(f"Environment: {'Production' if is_production else 'Staging'}")`,
          breakdown: [
            { lineRange: '4-6', explanation: 'Variable assignment: name = value. Python creates objects in memory and binds names to them. company_name points to a string object, active_users to an integer, is_production to a boolean.' },
            { lineRange: '8-10', explanation: 'f-strings (formatted string literals) embed variable values directly. print() sends output to stdout — the terminal or console.' },
          ],
          runnable: true,
          expectedOutput: 'System: Acme ERP Solutions\nActive users: 42\nEnvironment: Production',
        },
        erpExample: 'Odoo modules are Python — you edit code and restart the server to see changes (no compile step). A C# ERP integration service requires building (dotnet build) before deployment. This affects your development workflow: Python changes are faster to test, C# catches type errors before runtime.',
        odooConnection: 'Odoo uses Python\'s interpreted nature for its module system. When you install a module, Python imports your .py files directly. This is why syntax errors in Odoo modules crash the server at startup — the interpreter fails when it hits the bad line.',
        realProjectRecognition: 'Check for build artifacts: .dll/.exe files suggest compiled (.NET). No build step, just .py files = interpreted (Python). Both .ts source and .js output = TypeScript (compiled to JavaScript, then interpreted by browser).',
        commonMistakes: [
          { wrong: 'Compiled is always better than interpreted', right: 'Each has trade-offs: compiled = faster execution, earlier error detection; interpreted = faster development, more flexibility', explanation: 'Odoo chose Python for developer productivity. Performance-critical sections can use compiled extensions (Cython).' },
        ],
        interviewTerminology: '"Python is interpreted, which means our Odoo modules are loaded and executed at server startup without a separate compilation step. This enables rapid development but means syntax and import errors surface at runtime. For our C# integration services, we compile first, catching type errors at build time before deployment."',
      },
      requiresAnswer: {
        question: 'Predict the output of the code example above BEFORE running it. Write exactly what you expect each print statement to show.',
        type: 'predict',
        modelAnswer: 'System: Acme ERP Solutions, Active users: 42, Environment: Production',
      },
    },
    {
      id: 's3-data-types',
      title: 'Variables and Data Types',
      type: 'theory',
      content: {
        simpleExplanation: 'A variable is a named container that holds a value in the computer\'s memory. A data type tells the computer what kind of value it is — a number, text, true/false, or a list of items. You use variables constantly in ERP work: a sales order has a customer name (text), a total amount (number), and an is_confirmed flag (true/false). In Python, you create a variable simply by assigning a value to a name.',
        professionalDefinition: 'A variable is a symbolic name bound to an object in memory during program execution. Data types define the set of possible values and operations applicable to a variable. Python uses dynamic typing — types are associated with objects, not variable names, and are determined at runtime. Core built-in types include int, float, str, bool, list, dict, tuple, and NoneType.',
        whyItExists: 'Programs need to store and manipulate data. Without variables, you could not track a customer\'s name across functions, accumulate a running total, or store query results. Data types exist to ensure operations are meaningful — you cannot multiply a customer name by a quantity, but you can multiply unit price by quantity.',
        howItWorks: 'When Python executes `price = 99.50`: (1) Python creates a float object 99.50 in memory. (2) The name "price" is added to the current scope\'s namespace dictionary. (3) "price" is bound to the memory address of that float object. (4) When you later use `price`, Python looks up the name in the namespace and retrieves the object. Reassigning `price = 150.0` binds the name to a new object; the old object may be garbage collected if nothing else references it.',
        syntax: [
          { piece: 'name = value', explanation: 'Assignment operator. Creates or rebinds a variable name to an object.' },
          { piece: 'int — whole numbers', explanation: 'quantity = 10, order_id = 5001' },
          { piece: 'float — decimal numbers', explanation: 'unit_price = 99.50, tax_rate = 0.05' },
          { piece: 'str — text strings', explanation: 'customer_name = "Acme Corp", status = \'draft\'' },
          { piece: 'bool — True or False', explanation: 'is_confirmed = True, is_active = False' },
          { piece: 'type(variable)', explanation: 'Built-in function that returns the type of any object.' },
        ],
        codeExample: {
          language: 'python',
          code: `# ERP Sales Order variables
order_id = 1001                    # int - unique identifier
customer_name = "Global Trading LLC"  # str - text
quantity = 5                         # int - whole units
unit_price = 450.00                  # float - decimal money
is_confirmed = False                 # bool - state flag
discount_rate = 0.10                 # float - 10% discount

# Calculate order total
subtotal = quantity * unit_price
discount_amount = subtotal * discount_rate
total = subtotal - discount_amount

print(f"Order #{order_id} for {customer_name}")
print(f"Subtotal: {subtotal:.2f}")
print(f"Discount: {discount_amount:.2f}")
print(f"Total: {total:.2f}")
print(f"Confirmed: {is_confirmed}")
print(f"Type of order_id: {type(order_id)}")
print(f"Type of total: {type(total)}")`,
          breakdown: [
            { lineRange: '2-7', explanation: 'Six variables of different types modeling a sales order. Each variable name describes its business purpose — professional code uses meaningful names, not x, y, z.' },
            { lineRange: '10-12', explanation: 'Arithmetic operations on numeric types. Multiplication works on int*float, producing float. This mirrors ERP line total calculations.' },
            { lineRange: '14-19', explanation: 'f-string formatting :.2f limits decimal places to 2 — standard for currency display. type() reveals the runtime type of any value.' },
          ],
          runnable: true,
          expectedOutput: 'Order #1001 for Global Trading LLC\nSubtotal: 2250.00\nDiscount: 225.00\nTotal: 2025.00\nConfirmed: False\nType of order_id: <class \'int\'>\nType of total: <class \'float\'>',
        },
        erpExample: 'In an ERP sales order: order_id (int), partner_name (str), amount_total (float), state (str: draft/confirmed/done), date_order (datetime). Each field in Odoo maps directly to a Python variable with a specific type enforced by the ORM.',
        odooConnection: 'Odoo fields define types: fields.Integer(), fields.Char(), fields.Float(), fields.Boolean(), fields.Many2one(). When you read record.amount_total, you get a Python float. When you read record.partner_id, you get a recordset object (Odoo\'s custom type).',
        realProjectRecognition: 'When reading unknown code, look for variable naming patterns: snake_case in Python (order_total), PascalCase for classes (SaleOrder), ALL_CAPS for constants (MAX_RETRY). Type hints like `def calc(qty: int, price: float) -> float:` reveal expected types.',
        commonMistakes: [
          { wrong: 'Using "5" (string) instead of 5 (integer) for calculations', right: 'Ensure numeric types for arithmetic: quantity = 5', explanation: '"5" * 100 = "55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555" (string repetition!)' },
          { wrong: 'Comparing float with == for money', right: 'Use round() or Decimal for financial calculations', explanation: '0.1 + 0.2 == 0.3 is False in float arithmetic. ERP systems use Decimal types for money.' },
        ],
        debugging: [
          { errorType: 'TypeError', code: 'total = "500" + 100', error: "TypeError: can only concatenate str (not \"int\") to str", investigation: 'Check variable types with type(). Trace where the variable was assigned. Look for API responses that return strings instead of numbers.', fix: 'Convert with int() or float(): total = float("500") + 100' },
        ],
        interviewTerminology: '"Python uses dynamic typing — variables are just names bound to objects, and the type belongs to the object itself. In our Odoo development, field types enforce data integrity at the ORM level, but understanding Python types is essential for writing correct business logic in model methods."',
      },
      requiresAnswer: {
        question: 'What will happen if you change line 3 to quantity = "5" (a string)? Predict the error or unexpected output.',
        type: 'predict',
        modelAnswer: 'subtotal would become string repetition ("5" repeated 450 times) or a TypeError when trying to subtract discount, because you cannot do arithmetic on strings mixed with floats.',
      },
    },
    {
      id: 's4-erp-transaction',
      title: 'How an ERP Transaction Flows End-to-End',
      type: 'erp_connection',
      content: {
        simpleExplanation: 'When you click "Confirm" on a Sales Order, you trigger a chain of events across multiple systems. Your browser sends a message to the server. The server runs Python code that validates the order. That code tells the database to update records. The database saves the changes and confirms. The server sends a response back to your browser. Your screen updates. Understanding this chain — and which layer owns each step — is the foundation of ERP debugging.',
        professionalDefinition: 'An ERP transaction follows a request-response cycle across presentation, application, and data tiers. The presentation tier (browser/JS) captures user intent and serializes it into an HTTP request. The application tier (Python/Controllers/Models) validates business rules, orchestrates operations, and invokes the ORM. The data tier (PostgreSQL) executes SQL within ACID transactions, ensuring atomicity and consistency.',
        whyItExists: 'ERP systems separate concerns into layers so each can be developed, tested, and scaled independently. The UI does not directly modify the database — business rules would be bypassed. The database does not contain business logic — it would be duplicated across clients. The layered flow ensures validation, audit trails, and security at every step.',
        howItWorks: 'Step 1: User clicks "Confirm" → JavaScript event handler fires. Step 2: JS calls Odoo RPC endpoint with model name, method, record ID. Step 3: Odoo web controller routes to the correct model method (action_confirm). Step 4: Python method validates preconditions (state == draft, lines exist, credit check). Step 5: Method calls ORM write() to update state field. Step 6: ORM generates SQL: UPDATE sale_order SET state=\'sale\' WHERE id=X. Step 7: PostgreSQL executes within a transaction. Step 8: Triggers/computed fields may fire additional SQL. Step 9: Transaction commits. Step 10: Python method returns result. Step 11: Controller serializes response to JSON. Step 12: Browser receives response, UI re-renders.',
        erpExample: 'Sales Order confirmation: draft → sale state change. Stock reservation may trigger. Invoice generation may be scheduled. Email notification may queue. Each side effect is a separate method call in the chain, all within one database transaction.',
        odooConnection: 'In Odoo, action_confirm() on sale.order model is the entry point. You can find it in addons/sale/models/sale_order.py. Setting a breakpoint there lets you trace the entire confirmation flow. Debug mode (?debug=1) shows model names and method calls in the UI.',
        realProjectRecognition: 'When debugging "button does nothing": (1) Browser DevTools Network tab — was the request sent? What HTTP status? (2) Server logs — was the method called? Any Python traceback? (3) Database logs — was SQL generated? (4) Check record state before and after with a SELECT query.',
        interviewTerminology: '"When a user confirms a sales order, the request flows from the Odoo web client via JSON-RPC to the sale.order model\'s action_confirm method. This method validates business preconditions, then uses the ORM to persist the state change within a PostgreSQL transaction. Any validation failure raises a UserError before the transaction commits, ensuring data integrity."',
      },
      requiresAnswer: {
        question: 'A user says "Confirm button does nothing." Where would you investigate FIRST, and what evidence would you look for?',
        type: 'identify',
        modelAnswer: 'First: Browser DevTools Network tab to check if an HTTP request was sent when clicking Confirm. Look for the request status code (200, 500, or no request at all).',
      },
    },
    {
      id: 's5-scope-execution',
      title: 'Scope and Execution Flow',
      type: 'theory',
      content: {
        simpleExplanation: 'Scope determines where a variable name is visible and accessible. Execution flow determines the order in which code runs. When a function is called, Python pauses the current code, jumps into the function, executes it, and returns to where it was called. Understanding scope prevents "variable not defined" errors. Understanding execution flow helps you trace bugs.',
        professionalDefinition: 'Scope is the textual region of code where a binding (name-to-object mapping) is accessible. Python uses lexical (static) scoping with four namespaces: local, enclosing, global, and built-in (LEGB rule). Execution flow follows the call stack — each function call pushes a new stack frame containing local variables, parameters, and return address.',
        whyItExists: 'Without scope, every variable would be global and any function could accidentally overwrite another\'s data. Without structured execution flow, code would be an unreadable flat sequence with no way to reuse logic.',
        howItWorks: 'When calculate_total(5, 100) is called: (1) A new stack frame is created. (2) Parameters qty=5 and price=100 are local variables in this frame. (3) The function body executes. (4) return sends a value back and destroys the frame. (5) The caller receives the return value and continues.',
        codeExample: {
          language: 'python',
          code: `# Global scope
TAX_RATE = 0.05  # Accessible everywhere in this module

def calculate_line_total(quantity, unit_price):
    """Function scope: quantity and unit_price are local."""
    subtotal = quantity * unit_price
    tax = subtotal * TAX_RATE  # Can read global TAX_RATE
    return subtotal + tax

def process_order(lines):
    """Each function call gets its own scope."""
    order_total = 0
    for item in lines:
        line_total = calculate_line_total(item["qty"], item["price"])
        order_total += line_total
    return order_total

# Execution flow: top to bottom
order_lines = [
    {"qty": 2, "price": 450.00},
    {"qty": 5, "price": 89.00},
]
grand_total = process_order(order_lines)
print(f"Grand Total (incl. tax): {grand_total:.2f}")`,
          breakdown: [
            { lineRange: '2', explanation: 'TAX_RATE is module-level (global). Convention: UPPER_CASE for constants.' },
            { lineRange: '4-8', explanation: 'Function parameters and local variables exist only while the function runs. return exits the function and passes a value back.' },
            { lineRange: '10-16', explanation: 'process_order calls calculate_line_total for each line. Each call creates a separate scope. order_total accumulates across iterations.' },
            { lineRange: '19-24', explanation: 'Main execution block. This runs after all function definitions are parsed (functions are defined, not executed, at definition time).' },
          ],
          runnable: true,
          expectedOutput: 'Grand Total (incl. tax): 1165.25',
        },
        erpExample: 'Odoo model methods work the same way: self is a parameter (the record instance), local variables exist within the method, and return values propagate back to the caller (often the web controller or another method).',
        odooConnection: 'When action_confirm calls self.write({\'state\': \'sale\'}), execution flows: action_confirm → write → _write → SQL generation. Each method has its own scope with self as the recordset.',
        commonMistakes: [
          { wrong: 'Trying to access a local variable from outside the function', right: 'Return the value you need from the function', explanation: 'Variables inside a function are destroyed when the function returns.' },
        ],
        interviewTerminology: '"Python follows the LEGB rule for variable lookup: Local, Enclosing, Global, Built-in. In Odoo model methods, self is the recordset parameter, and local variables are scoped to the method. Understanding the call stack is essential for debugging — each method call pushes a frame, and tracebacks read from innermost to outermost frame."',
      },
      requiresAnswer: {
        question: 'Trace the execution flow: when process_order runs, how many times is calculate_line_total called, and what does each call return?',
        type: 'explain',
        modelAnswer: 'Called twice: once for {qty:2, price:450} returning 945.0, once for {qty:5, price:89} returning 467.25. process_order sums these to 1412.25... wait with tax: 945 + 467.25 = 1412.25. Actually line 1: 2*450=900, tax=45, total=945. Line 2: 5*89=445, tax=22.25, total=467.25. Grand total = 1412.25.',
      },
    },
  ],
  codeReadingExercise: {
    id: 'cr-day01-01',
    title: 'Read an Odoo-Style Approval Function',
    description: 'Read this Python function cold — without running it. Answer each question based solely on reading the code. This is the primary skill of a professional developer.',
    code: `def action_confirm_sale_order(order, user):
    """Confirm a sales order if all validations pass."""
    if order['state'] != 'draft':
        raise ValueError(f"Cannot confirm order in state: {order['state']}")

    if not order.get('lines'):
        raise ValueError("Cannot confirm an order with no lines")

    if order['total_amount'] <= 0:
        raise ValueError("Order total must be positive")

    for line in order['lines']:
        if line['quantity'] <= 0:
            raise ValueError(f"Invalid quantity on line {line['id']}")

    if not user.get('can_confirm_orders'):
        raise PermissionError(f"User {user['name']} lacks confirmation permission")

    order['state'] = 'confirmed'
    order['confirmed_by'] = user['id']
    order['confirmed_at'] = get_current_timestamp()

    return {
        'success': True,
        'message': f"Order {order['id']} confirmed by {user['name']}",
        'new_state': order['state']
    }`,
    language: 'python',
    questions: [
      {
        id: 'crq1',
        question: 'What are all the validation checks performed BEFORE the order state is changed?',
        type: 'identify',
        modelAnswer: 'Four validations: (1) state must be draft, (2) order must have lines, (3) total_amount must be positive, (4) each line quantity must be positive, (5) user must have can_confirm_orders permission.',
        scoringCriteria: ['state check', 'lines exist', 'total amount positive', 'line quantity', 'permission'],
      },
      {
        id: 'crq2',
        question: 'What type of error is raised if the user lacks permission? What is the difference between ValueError and PermissionError here?',
        type: 'explain',
        modelAnswer: 'PermissionError is raised for authorization failures (user lacks can_confirm_orders). ValueError is raised for business rule violations (wrong state, no lines, invalid amounts). The distinction matters: ValueError = bad data, PermissionError = unauthorized user.',
        scoringCriteria: ['PermissionError', 'authorization', 'ValueError', 'business rule', 'distinction'],
      },
      {
        id: 'crq3',
        question: 'If this function is called with an order in state "confirmed", what happens? Trace the exact execution path.',
        type: 'predict',
        modelAnswer: 'The first if-check (state != draft) evaluates to True because state is "confirmed". ValueError is raised immediately with message "Cannot confirm order in state: confirmed". No further code executes. The order is NOT modified.',
        scoringCriteria: ['first check fails', 'ValueError raised', 'no state change', 'immediate exit'],
      },
    ],
  },
  challenges: [
    {
      id: 'ch-day01-01',
      title: 'ERP System Info Script',
      description: 'Write a Python script that stores ERP system information in variables and prints a formatted summary. This mirrors how Odoo modules initialize configuration.',
      difficulty: 'foundation',
      language: 'python',
      starterCode: `# Create variables for your ERP system and print a summary
# Required variables:
#   system_name (str): name of the ERP system
#   version (str): version number
#   active_modules (int): number of active modules
#   total_users (int): number of users
#   is_production (bool): whether this is production
#
# Print a formatted summary using f-strings
# Expected output format:
#   ERP System: [name]
#   Version: [version]
#   Active Modules: [count]
#   Total Users: [count]
#   Environment: Production (or Staging)

`,
      testCases: [
        { input: '', expectedOutput: 'ERP System:', description: 'Output contains system info header' },
        { input: '', expectedOutput: 'Version:', description: 'Output contains version' },
        { input: '', expectedOutput: 'Environment:', description: 'Output contains environment' },
      ],
      hints: [
        'Assign each value to a clearly named variable first',
        'Use f-strings: print(f"ERP System: {system_name}")',
        'Use a conditional for Environment: "Production" if is_production else "Staging"',
      ],
      solution: `system_name = "Odoo Enterprise"
version = "17.0"
active_modules = 45
total_users = 128
is_production = True

print(f"ERP System: {system_name}")
print(f"Version: {version}")
print(f"Active Modules: {active_modules}")
print(f"Total Users: {total_users}")
print(f"Environment: {'Production' if is_production else 'Staging'}")`,
      erpContext: 'Every Odoo deployment has system metadata. This exercise builds the habit of using typed variables for configuration values.',
    },
    {
      id: 'ch-day01-02',
      title: 'Calculate Order Line Total',
      description: 'Write a function that calculates the total for a sales order line, including tax. This is the most fundamental calculation in any ERP system.',
      difficulty: 'standard',
      language: 'python',
      starterCode: `def calculate_order_line_total(quantity, unit_price, tax_rate=0.05):
    """
    Calculate the total for an order line including tax.
    
    Args:
        quantity: number of items (int or float)
        unit_price: price per item (float)
        tax_rate: tax percentage as decimal (default 0.05 = 5%)
    
    Returns:
        dict with 'subtotal', 'tax_amount', and 'total' keys
    """
    # Your code here
    pass

# Test your function
result = calculate_order_line_total(10, 99.50)
print(f"Subtotal: {result['subtotal']:.2f}")
print(f"Tax: {result['tax_amount']:.2f}")
print(f"Total: {result['total']:.2f}")
`,
      testCases: [
        { input: '', expectedOutput: 'Subtotal: 995.00', description: 'Correct subtotal calculation' },
        { input: '', expectedOutput: 'Tax: 49.75', description: 'Correct tax calculation' },
        { input: '', expectedOutput: 'Total: 1044.75', description: 'Correct total' },
      ],
      hints: [
        'subtotal = quantity * unit_price',
        'tax_amount = subtotal * tax_rate',
        'total = subtotal + tax_amount',
        'Return a dictionary: return {"subtotal": subtotal, "tax_amount": tax_amount, "total": total}',
      ],
      solution: `def calculate_order_line_total(quantity, unit_price, tax_rate=0.05):
    subtotal = quantity * unit_price
    tax_amount = subtotal * tax_rate
    total = subtotal + tax_amount
    return {"subtotal": subtotal, "tax_amount": tax_amount, "total": total}`,
      erpContext: 'This calculation appears in every ERP: Odoo sale.order.line, SAP item lines, custom systems. Master this pattern.',
    },
  ],
  debuggingChallenge: {
    id: 'dbg-day01-01',
    title: 'Fix the Stock Validation Function',
    scenario: 'A warehouse user reports that the stock validation function crashes when processing transfers. The error log shows a TypeError. Investigate and fix the bug.',
    brokenCode: `def validate_transfer_line(item_id, quantity, available_stock):
    """Validate that a stock transfer line has sufficient stock."""
    item_name = get_item_name(item_id)

    if quantity > available_stock:
        return False, f"Insufficient stock for {item_name}: need {quantity}, have {available_stock}"

    if quantity <= 0:
        return False, "Quantity must be positive"

    remaining = available_stock - quantity
    warning = None
    if remaining < 5:
        warning = f"Low stock warning: only {remaining} units left after transfer"

    total_value = quantity * get_item_price(item_id)
    return True, f"OK - transfer value: {total_value:.2f}", warning


def get_item_name(item_id):
    items = {1: "Laptop Pro", 2: "Wireless Mouse", 3: "A4 Paper"}
    return items.get(item_id, "Unknown")


def get_item_price(item_id):
    prices = {1: "4500.00", 2: "89.00", 3: "25.00"}
    return prices.get(item_id, "0.00")


# This call crashes:
result = validate_transfer_line(1, 5, 15)
print(result)`,
    language: 'python',
    errorMessage: 'TypeError: can\'t multiply sequence by non-int of type \'str\'',
    errorType: 'TypeError',
    investigationSteps: [
      { action: 'Read the error message and identify the failing operation', result: 'TypeError involving multiplication — one operand is a string', isOptimal: true, points: 20 },
      { action: 'Check the types of variables involved in the multiplication on the failing line', result: 'get_item_price returns a string "4500.00" not a float', isOptimal: true, points: 20 },
      { action: 'Trace get_item_price to find where string prices are defined', result: 'The prices dictionary stores strings instead of floats', isOptimal: true, points: 20 },
      { action: 'Fix by converting to float in get_item_price or at the dictionary level', result: 'Change prices to float values or add float() conversion', isOptimal: true, points: 20 },
      { action: 'Verify the fix by running the function again', result: 'Function returns correct result without error', isOptimal: true, points: 20 },
    ],
    fix: `def get_item_price(item_id):
    prices = {1: 4500.00, 2: 89.00, 3: 25.00}
    return prices.get(item_id, 0.00)`,
    explanation: 'The root cause was storing prices as strings in the dictionary. When quantity (int) * price (str) was evaluated, Python attempted string repetition instead of multiplication. The fix ensures prices are float type. In ERP systems, this commonly happens when API responses or database fields return numeric values as strings.',
  },
  erpScenario: {
    id: 'erp-day01-01',
    title: 'Trace a Sales Order Approval in Odoo',
    businessContext: 'A sales manager clicks "Confirm" on Sales Order SO/2025/00142 in Odoo. The order has 3 lines totaling AED 12,450. The customer is Acme Corporation. The warehouse must reserve stock upon confirmation.',
    technicalChallenge: 'Describe the complete technical flow from button click to database update. Identify every layer, runtime, and technology involved.',
    questions: [
      'What happens in the browser when the user clicks Confirm?',
      'What HTTP request is sent, and to which endpoint?',
      'Which Python method handles the confirmation?',
      'What validations run before the state changes?',
      'What SQL statements does the ORM generate?',
      'What side effects occur (stock reservation, notifications)?',
    ],
    connection: 'This scenario connects Day 1 concepts (runtime, execution flow, variables, data types) to the real Odoo workflow you will master in Days 16-17. Every layer you identify here is a layer you will debug in the ERP Support War Room.',
  },
  quiz: [
    {
      id: 'q1-d1', type: 'multiple_choice', topic: 'programming_fundamentals',
      question: 'What is a runtime environment?',
      options: ['A type of variable', 'The infrastructure that executes program code', 'A database connection', 'A CSS framework'],
      correctAnswer: 'The infrastructure that executes program code',
      explanation: 'The runtime manages code execution, memory, and system resources.',
      points: 10,
    },
    {
      id: 'q2-d1', type: 'multiple_choice', topic: 'python',
      question: 'Which of these is a valid Python variable assignment?',
      options: ['int quantity = 5', 'quantity := 5', 'quantity = 5', 'var quantity = 5'],
      correctAnswer: 'quantity = 5',
      explanation: 'Python uses simple name = value assignment. No type declaration or var keyword needed.',
      points: 10,
    },
    {
      id: 'q3-d1', type: 'predict_output', topic: 'python',
      question: 'What does this code print?', code: 'x = 10\nprint(type(x).__name__)',
      language: 'python', correctAnswer: 'int',
      explanation: 'type(10) returns <class int>, and __name__ gives the string "int".',
      points: 10,
    },
    {
      id: 'q4-d1', type: 'multiple_choice', topic: 'programming_fundamentals',
      question: 'Python is which type of language?',
      options: ['Compiled only', 'Interpreted', 'Markup language', 'Query language'],
      correctAnswer: 'Interpreted',
      explanation: 'Python code is executed by the interpreter line by line at runtime.',
      points: 10,
    },
    {
      id: 'q5-d1', type: 'find_error', topic: 'debugging',
      question: 'What error occurs?', code: 'price = "99.50"\ntotal = price * 2\nresult = total + 10',
      language: 'python', correctAnswer: 'TypeError',
      explanation: '"99.50" * 2 repeats the string. Then adding 10 (int) to a string fails with TypeError.',
      points: 10,
    },
    {
      id: 'q6-d1', type: 'multiple_choice', topic: 'programming_fundamentals',
      question: 'In ERP architecture, which layer validates business rules?',
      options: ['Database layer', 'Application/Service layer', 'Browser only', 'Network layer'],
      correctAnswer: 'Application/Service layer',
      explanation: 'Business validation belongs in the application layer, not the database or frontend alone.',
      points: 10,
    },
    {
      id: 'q7-d1', type: 'explain_code', topic: 'code_reading',
      question: 'What does this function return when called with calculate_total(3, 50.0)?',
      code: 'def calculate_total(qty, price):\n    return qty * price',
      language: 'python', correctAnswer: '150.0',
      explanation: '3 * 50.0 = 150.0 (float multiplication).',
      points: 10,
    },
    {
      id: 'q8-d1', type: 'multiple_choice', topic: 'python',
      question: 'What is the output of: print(f"Order: {1001}")?',
      options: ['Order: {1001}', 'f"Order: {1001}"', 'Order: 1001', 'Error'],
      correctAnswer: 'Order: 1001',
      explanation: 'f-strings evaluate expressions inside curly braces.',
      points: 10,
    },
    {
      id: 'q9-d1', type: 'analyze_erp', topic: 'erp_analysis',
      question: 'When debugging "button does nothing" in Odoo, what should you check FIRST?',
      options: ['Restart the server', 'Browser DevTools Network tab for the HTTP request', 'Delete the record', 'Reinstall the module'],
      correctAnswer: 'Browser DevTools Network tab for the HTTP request',
      explanation: 'Always verify whether the frontend sent a request and what response it received.',
      points: 10,
    },
    {
      id: 'q10-d1', type: 'multiple_choice', topic: 'programming_fundamentals',
      question: 'What does LEGB stand for in Python scope resolution?',
      options: ['Loop, Execute, Global, Build', 'Local, Enclosing, Global, Built-in', 'List, Enum, Generate, Binary', 'Load, Execute, Generate, Boot'],
      correctAnswer: 'Local, Enclosing, Global, Built-in',
      explanation: 'Python searches for variable names in this order: Local → Enclosing → Global → Built-in.',
      points: 10,
    },
  ],
  exam: [
    {
      id: 'e1-d1', type: 'write_code', topic: 'python',
      question: 'Write a function validate_quantity(qty) that returns True if qty is a positive number, False otherwise.',
      correctAnswer: 'def validate_quantity(qty): return qty > 0',
      explanation: 'Simple comparison: quantity must be greater than zero.',
      points: 15,
    },
    {
      id: 'e2-d1', type: 'explain_code', topic: 'code_reading',
      question: 'Explain what this Odoo-style code does in one sentence:',
      code: "records = self.env['sale.order'].search([('state','=','draft')], limit=5)",
      language: 'python',
      correctAnswer: 'searches for up to 5 draft sales orders',
      explanation: 'search() with domain filter and limit parameter.',
      points: 15,
    },
    {
      id: 'e3-d1', type: 'multiple_choice', topic: 'programming_fundamentals',
      question: 'Which is NOT a Python data type?',
      options: ['int', 'str', 'bool', 'varchar'],
      correctAnswer: 'varchar',
      explanation: 'varchar is a SQL data type. Python uses str for text.',
      points: 10,
    },
    {
      id: 'e4-d1', type: 'predict_output', topic: 'python',
      question: 'What is the output?', code: 'a = True\nb = False\nprint(a and b or True)',
      language: 'python', correctAnswer: 'True',
      explanation: 'True and False = False. False or True = True.',
      points: 10,
    },
    {
      id: 'e5-d1', type: 'analyze_erp', topic: 'erp_analysis',
      question: 'Order the layers correctly for an ERP transaction (first to last):',
      options: [
        'Database → Backend → API → Frontend',
        'Frontend → API → Backend → Database',
        'Backend → Frontend → Database → API',
        'API → Database → Frontend → Backend',
      ],
      correctAnswer: 'Frontend → API → Backend → Database',
      explanation: 'User interaction starts at frontend, flows through API to backend, which queries the database.',
      points: 15,
    },
  ],
  terminology: ['runtime', 'interpreter', 'compiler', 'variable', 'data_type', 'scope', 'execution_flow'],
};
