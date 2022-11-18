"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: process.env.POSTGRES_HOST || 'db',
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
});
pool.on('connect', (client) => {
    client
        .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
        .catch(err => console.log(err));
    client
        .query('CREATE TABLE IF NOT EXISTS accounts (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), balance MONEY NOT NULL);')
        .catch(err => console.log(err));
    client
        .query('CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, accountId uuid REFERENCES accounts(id));')
        .catch(err => console.log(err));
    client
        .query('CREATE TABLE IF NOT EXISTS transactions(id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), debitedAccountId uuid REFERENCES accounts(id) NOT NULL, creditedAccountId uuid REFERENCES accounts(id) NOT NULL, value MONEY NOT NULL, createdAt TIMESTAMP DEFAULT current_timestamp);')
        .catch(err => console.log(err));
    client
        .query("CREATE OR REPLACE FUNCTION disallow_overflow() RETURNS trigger AS $$ BEGIN if(NEW.balance::numeric < 0) then raise exception 'Invalid update.' using hint = 'Tentativa de transferência em valor maior que o saldo atual.'; end if; RETURN NEW; END $$ LANGUAGE plpgsql;")
        .catch(err => console.log(err));
    client
        .query('CREATE OR REPLACE TRIGGER tr_disallow_overflow BEFORE UPDATE OF balance ON accounts FOR EACH ROW EXECUTE PROCEDURE disallow_overflow();')
        .catch(err => console.log(err));
});
exports.default = pool;
