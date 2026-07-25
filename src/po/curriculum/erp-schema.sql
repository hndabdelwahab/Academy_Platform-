-- ERP Practice Schema for SQL Playground
-- Simulates a realistic ERP database structure

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INTEGER REFERENCES users(id),
  role_id INTEGER REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS item_categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  category_id INTEGER REFERENCES item_categories(id),
  unit_price REAL DEFAULT 0,
  active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS warehouses (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS shelf_locations (
  id INTEGER PRIMARY KEY,
  warehouse_id INTEGER REFERENCES warehouses(id),
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stock (
  id INTEGER PRIMARY KEY,
  item_id INTEGER REFERENCES items(id),
  location_id INTEGER REFERENCES shelf_locations(id),
  qty REAL DEFAULT 0,
  UNIQUE(item_id, location_id)
);

CREATE TABLE IF NOT EXISTS sales_orders (
  id INTEGER PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  status TEXT DEFAULT 'draft',
  total_amount REAL DEFAULT 0,
  order_date TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales_order_lines (
  id INTEGER PRIMARY KEY,
  order_id INTEGER REFERENCES sales_orders(id),
  item_id INTEGER REFERENCES items(id),
  quantity REAL NOT NULL,
  unit_price REAL NOT NULL,
  subtotal REAL NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stock_transfers (
  id INTEGER PRIMARY KEY,
  from_location_id INTEGER REFERENCES shelf_locations(id),
  to_location_id INTEGER REFERENCES shelf_locations(id),
  status TEXT DEFAULT 'draft',
  created_by INTEGER REFERENCES users(id),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stock_transfer_lines (
  id INTEGER PRIMARY KEY,
  transfer_id INTEGER REFERENCES stock_transfers(id),
  item_id INTEGER REFERENCES items(id),
  quantity REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  sales_order_id INTEGER REFERENCES sales_orders(id),
  status TEXT DEFAULT 'draft',
  total_amount REAL DEFAULT 0,
  invoice_date TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoice_lines (
  id INTEGER PRIMARY KEY,
  invoice_id INTEGER REFERENCES invoices(id),
  item_id INTEGER REFERENCES items(id),
  quantity REAL NOT NULL,
  unit_price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY,
  invoice_id INTEGER REFERENCES invoices(id),
  amount REAL NOT NULL,
  payment_date TEXT DEFAULT CURRENT_TIMESTAMP,
  method TEXT DEFAULT 'bank'
);

-- Seed Data
INSERT INTO roles (id, name, description) VALUES
  (1, 'Admin', 'Full system access'),
  (2, 'Sales Manager', 'Manage sales orders and clients'),
  (3, 'Warehouse User', 'Manage stock and transfers'),
  (4, 'Accountant', 'Manage invoices and payments');

INSERT INTO users (id, name, email, active) VALUES
  (1, 'Ahmed Hassan', 'ahmed@company.com', 1),
  (2, 'Sara Ali', 'sara@company.com', 1),
  (3, 'Omar Khalid', 'omar@company.com', 1),
  (4, 'Inactive User', 'inactive@company.com', 0);

INSERT INTO user_roles VALUES (1,1), (2,2), (3,3), (2,4);

INSERT INTO clients (id, name, email, phone, active) VALUES
  (1, 'Acme Corporation', 'orders@acme.com', '+971-4-1234567', 1),
  (2, 'Global Trading LLC', 'procurement@global.com', '+971-4-7654321', 1),
  (3, 'Tech Solutions FZE', 'buy@techsolutions.ae', '+971-4-9998877', 1);

INSERT INTO item_categories (id, name) VALUES
  (1, 'Electronics'), (2, 'Office Supplies'), (3, 'Furniture');

INSERT INTO items (id, name, sku, category_id, unit_price) VALUES
  (1, 'Laptop Pro 15', 'ELEC-001', 1, 4500.00),
  (2, 'Wireless Mouse', 'ELEC-002', 1, 89.00),
  (3, 'A4 Paper Ream', 'OFF-001', 2, 25.00),
  (4, 'Office Chair Ergo', 'FUR-001', 3, 1200.00),
  (5, 'Standing Desk', 'FUR-002', 3, 2800.00);

INSERT INTO warehouses (id, name, code) VALUES
  (1, 'Main Warehouse', 'WH-MAIN'),
  (2, 'Dubai Branch', 'WH-DXB');

INSERT INTO shelf_locations (id, warehouse_id, name) VALUES
  (1, 1, 'A-01-01'), (2, 1, 'A-01-02'), (3, 1, 'B-02-01'),
  (4, 2, 'DXB-01'), (5, 2, 'DXB-02');

INSERT INTO stock (item_id, location_id, qty) VALUES
  (1, 1, 15), (1, 4, 5),
  (2, 1, 200), (2, 2, 50),
  (3, 1, 500), (3, 3, 100),
  (4, 1, 8), (4, 5, 3),
  (5, 1, 4);

INSERT INTO sales_orders (id, client_id, status, total_amount, order_date) VALUES
  (1, 1, 'confirmed', 4589.00, '2025-06-01'),
  (2, 2, 'draft', 1200.00, '2025-06-05'),
  (3, 1, 'confirmed', 2800.00, '2025-06-10'),
  (4, 3, 'draft', 4500.00, '2025-06-12'),
  (5, 2, 'cancelled', 89.00, '2025-05-20');

INSERT INTO sales_order_lines (order_id, item_id, quantity, unit_price, subtotal) VALUES
  (1, 1, 1, 4500.00, 4500.00), (1, 2, 1, 89.00, 89.00),
  (2, 4, 1, 1200.00, 1200.00),
  (3, 5, 1, 2800.00, 2800.00),
  (4, 1, 1, 4500.00, 4500.00),
  (5, 2, 1, 89.00, 89.00);

INSERT INTO invoices (id, client_id, sales_order_id, status, total_amount) VALUES
  (1, 1, 1, 'paid', 4589.00),
  (2, 1, 3, 'draft', 2800.00);

INSERT INTO invoice_lines (invoice_id, item_id, quantity, unit_price) VALUES
  (1, 1, 1, 4500.00), (1, 2, 1, 89.00),
  (2, 5, 1, 2800.00);

INSERT INTO payments (invoice_id, amount, method) VALUES
  (1, 4589.00, 'bank');

INSERT INTO stock_transfers (id, from_location_id, to_location_id, status, created_by) VALUES
  (1, 1, 4, 'done', 3),
  (2, 1, 2, 'draft', 3);

INSERT INTO stock_transfer_lines (transfer_id, item_id, quantity) VALUES
  (1, 1, 3), (2, 2, 10);
