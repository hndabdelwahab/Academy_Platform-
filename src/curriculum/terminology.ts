import type { Term } from '@/types';

export const TERMINOLOGY: Term[] = [
  {
    key: 'runtime',
    term: 'Runtime',
    simpleMeaning: 'The environment that actually runs your code on the computer.',
    professionalDefinition: 'The execution environment providing infrastructure for code execution, including memory management, I/O handling, and system resource access.',
    example: 'When you type python script.py, the Python runtime (interpreter) executes your code.',
    erpExample: 'Odoo runs on the Python runtime. PostgreSQL has its own query execution runtime.',
    odooExample: 'Starting Odoo with ./odoo-bin launches the Python runtime with Odoo modules loaded.',
    relatedTerms: ['interpreter', 'compiler', 'execution_flow'],
    category: 'Programming Fundamentals',
  },
  {
    key: 'interpreter',
    term: 'Interpreter',
    simpleMeaning: 'A program that reads and executes your code line by line, without a separate compile step.',
    professionalDefinition: 'Software that directly executes instructions written in a programming language, translating and running code at runtime rather than pre-compiling to machine code.',
    example: 'The Python interpreter (python.exe) reads each line of your .py file and executes it immediately.',
    erpExample: 'Odoo modules are loaded and executed by the Python interpreter at server startup.',
    odooExample: 'When you modify an Odoo model and restart the server, the interpreter re-reads your Python files.',
    relatedTerms: ['runtime', 'compiler'],
    category: 'Programming Fundamentals',
  },
  {
    key: 'compiler',
    term: 'Compiler',
    simpleMeaning: 'A program that translates your entire source code into machine code before it runs.',
    professionalDefinition: 'A translator that converts source code written in a high-level language into machine code or intermediate bytecode prior to execution, enabling optimization and early error detection.',
    example: 'C# code is compiled by the Roslyn compiler into IL bytecode, then JIT-compiled by the CLR.',
    erpExample: 'C# ERP integration services are compiled before deployment. Type errors are caught at build time.',
    relatedTerms: ['interpreter', 'runtime'],
    category: 'Programming Fundamentals',
  },
  {
    key: 'variable',
    term: 'Variable',
    simpleMeaning: 'A named container that holds a value in the computer\'s memory.',
    professionalDefinition: 'A symbolic name bound to an object in memory during program execution, serving as a reference to stored data that can be read and modified.',
    example: 'customer_name = "Acme Corp" creates a variable holding the text "Acme Corp".',
    erpExample: 'In a sales order: order_id, partner_name, amount_total, state are all variables/fields.',
    odooExample: 'record.partner_id is a variable referencing a res.partner record in Odoo ORM.',
    relatedTerms: ['data_type', 'scope'],
    category: 'Programming Fundamentals',
  },
  {
    key: 'data_type',
    term: 'Data Type',
    simpleMeaning: 'The kind of value a variable holds — number, text, true/false, list, etc.',
    professionalDefinition: 'A classification defining the set of possible values and permitted operations for a data object. Types ensure operations are semantically valid.',
    example: 'int (whole numbers), float (decimals), str (text), bool (True/False), list, dict.',
    erpExample: 'ERP fields have types: quantity (number), name (text), is_active (boolean), order_date (date).',
    odooExample: 'fields.Integer(), fields.Char(), fields.Float(), fields.Boolean(), fields.Many2one().',
    relatedTerms: ['variable'],
    category: 'Programming Fundamentals',
  },
  {
    key: 'scope',
    term: 'Scope',
    simpleMeaning: 'The region of code where a variable name is accessible.',
    professionalDefinition: 'The textual context determining where a name binding is visible. Python follows LEGB: Local, Enclosing, Global, Built-in.',
    example: 'Variables inside a function are local — they exist only while the function runs.',
    erpExample: 'Odoo model method parameters (self, vals) are local to that method call.',
    relatedTerms: ['variable', 'execution_flow'],
    category: 'Programming Fundamentals',
  },
  {
    key: 'execution_flow',
    term: 'Execution Flow',
    simpleMeaning: 'The order in which code lines run, including jumps into and out of functions.',
    professionalDefinition: 'The sequential path of instruction execution governed by the call stack, control structures, and exception handling mechanisms.',
    example: 'Code runs top to bottom. Function calls pause the caller until the function returns.',
    erpExample: 'Confirm button → JS handler → RPC call → Python method → ORM write → SQL → response.',
    odooExample: 'action_confirm() → write() → _write() → SQL generation → PostgreSQL commit.',
    relatedTerms: ['runtime', 'scope'],
    category: 'Programming Fundamentals',
  },
];

export function getTerm(key: string): Term | undefined {
  return TERMINOLOGY.find((t) => t.key === key);
}

export function searchTerms(query: string): Term[] {
  const q = query.toLowerCase();
  return TERMINOLOGY.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.simpleMeaning.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q),
  );
}
