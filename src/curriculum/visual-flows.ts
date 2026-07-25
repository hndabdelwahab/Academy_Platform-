import type { VisualFlow } from '@/types';

export const VISUAL_FLOWS: VisualFlow[] = [
  {
    id: 'python-execution',
    title: 'Python Code Execution',
    description: 'What happens when you run a Python script',
    steps: [
      { id: '1', label: 'Source Code', description: 'You write a .py file with Python instructions', detail: 'Human-readable text stored on disk' },
      { id: '2', label: 'Python Interpreter', description: 'The python.exe program reads your file', detail: 'Located in your Python installation directory' },
      { id: '3', label: 'Parsing', description: 'Each line is parsed into an Abstract Syntax Tree (AST)', detail: 'Syntax errors are caught here' },
      { id: '4', label: 'Bytecode Compilation', description: 'AST is compiled to Python bytecode', detail: 'Internal .pyc representation' },
      { id: '5', label: 'PVM Execution', description: 'Python Virtual Machine executes bytecode instructions', detail: 'One instruction at a time' },
      { id: '6', label: 'Memory Operations', description: 'Variables created, functions called, objects stored in memory', detail: 'Each variable is a name bound to a memory address' },
      { id: '7', label: 'Function Calls', description: 'New stack frames pushed for each function call', detail: 'Local variables scoped to the frame' },
      { id: '8', label: 'Return Values', description: 'Functions return values, frames destroyed, caller continues', detail: 'Return propagates back through the call stack' },
    ],
  },
  {
    id: 'javascript-event-loop',
    title: 'JavaScript Event Loop',
    description: 'How the browser executes JavaScript asynchronously',
    steps: [
      { id: '1', label: 'Browser', description: 'User interacts with the web page', detail: 'Click, type, scroll events' },
      { id: '2', label: 'JavaScript Engine', description: 'V8/SpiderMonkey parses and executes JS code', detail: 'Chrome uses V8, Firefox uses SpiderMonkey' },
      { id: '3', label: 'Call Stack', description: 'Synchronously executes functions LIFO', detail: 'One thing at a time on the main thread' },
      { id: '4', label: 'Web APIs', description: 'Browser handles async operations (fetch, setTimeout)', detail: 'Runs outside the call stack' },
      { id: '5', label: 'Callback Queue', description: 'Completed async operations queue their callbacks', detail: 'FIFO — first in, first out' },
      { id: '6', label: 'Event Loop', description: 'Checks if call stack is empty, then pushes next callback', detail: 'The loop that connects async to sync' },
      { id: '7', label: 'Microtask Queue', description: 'Promises resolve here — higher priority than callback queue', detail: 'Processed after each call stack frame' },
    ],
  },
  {
    id: 'react-render',
    title: 'React Rendering Cycle',
    description: 'What happens when React state changes',
    steps: [
      { id: '1', label: 'Component', description: 'React component with state and props', detail: 'A function that returns JSX' },
      { id: '2', label: 'State Change', description: 'setState() or useState setter called', detail: 'User action or API response triggers update' },
      { id: '3', label: 'Re-render Triggered', description: 'React schedules a re-render of the component', detail: 'Not immediate — batched for performance' },
      { id: '4', label: 'Virtual DOM', description: 'React builds a new virtual DOM tree in memory', detail: 'Lightweight JavaScript representation' },
      { id: '5', label: 'Diffing', description: 'React compares new vs old virtual DOM', detail: 'Finds minimum changes needed' },
      { id: '6', label: 'DOM Update', description: 'Only changed elements updated in real DOM', detail: 'Efficient — no full page reload' },
    ],
  },
  {
    id: 'api-request',
    title: 'API Request Flow',
    description: 'Full stack request from frontend to database',
    steps: [
      { id: '1', label: 'Frontend Request', description: 'User action triggers fetch/axios call', detail: 'JavaScript serializes data to JSON' },
      { id: '2', label: 'HTTP Transport', description: 'Request sent over HTTP with method, headers, body', detail: 'GET, POST, PUT, DELETE + Authorization header' },
      { id: '3', label: 'API Endpoint', description: 'Server routes request to correct handler', detail: 'URL path maps to controller/route' },
      { id: '4', label: 'Controller', description: 'Receives request, validates input, calls service', detail: 'Thin layer — no business logic here' },
      { id: '5', label: 'Business Logic', description: 'Service layer applies business rules and validation', detail: 'Where "order total must be positive" lives' },
      { id: '6', label: 'Database', description: 'Repository/ORM generates and executes SQL', detail: 'ACID transaction ensures consistency' },
      { id: '7', label: 'Response', description: 'Data serialized to JSON, sent back with HTTP status', detail: '200 OK, 201 Created, 400 Bad Request, 500 Error' },
    ],
  },
  {
    id: 'odoo-transaction',
    title: 'Odoo Transaction Flow',
    description: 'What happens when a user clicks a button in Odoo',
    steps: [
      { id: '1', label: 'User Click', description: 'User clicks button in Odoo web interface', detail: 'Browser captures DOM event' },
      { id: '2', label: 'XML View', description: 'Button defined in XML view with type="object" and name="method_name"', detail: 'Views define UI structure and actions' },
      { id: '3', label: 'JavaScript/Web Client', description: 'Odoo JS framework sends JSON-RPC call', detail: 'web.rpc("/web/dataset/call_kw", ...)' },
      { id: '4', label: 'RPC Handler', description: 'Odoo web controller routes to model method', detail: 'Identifies model, method, record IDs, args' },
      { id: '5', label: 'Python Model Method', description: 'Business logic executes with self as recordset', detail: 'Validation, computation, side effects' },
      { id: '6', label: 'ORM', description: 'Object-Relational Mapping generates SQL queries', detail: 'create(), write(), search(), unlink()' },
      { id: '7', label: 'PostgreSQL', description: 'Database executes SQL within transaction', detail: 'COMMIT on success, ROLLBACK on error' },
      { id: '8', label: 'Response', description: 'Python return value serialized to JSON-RPC response', detail: 'Sent back to web client' },
      { id: '9', label: 'Updated View', description: 'Browser re-renders affected UI components', detail: 'Fields update, messages shown, actions triggered' },
    ],
  },
];

export function getVisualFlow(id: string): VisualFlow | undefined {
  return VISUAL_FLOWS.find((f) => f.id === id);
}
