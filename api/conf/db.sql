-- ==============================================================================
-- таблица table_user создана --
-- CREATE TABLE table_user(
--     user_id SERIAL PRIMARY KEY NOT NULL,
--     user_firstname VARCHAR(255) DEFAULT 'Finame',
--     user_lastname VARCHAR(255) DEFAULT 'Laname',
--     user_age DATE NOT NULL DEFAULT CURRENT_DATE,
--     user_rule VARCHAR(255) REFERENCES table_rule (rule_title) DEFAULT 'admin-1',

--     user_history VARCHAR(255),

--     user_login VARCHAR(255) UNIQUE,
--     user_email VARCHAR(255) UNIQUE,
--     user_key VARCHAR(255) UNIQUE NOT NULL default md5(random()::text),
--     user_status BOOLEAN DEFAULT false,

--     user_password VARCHAR(255),

--     user_reg TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
-- );
-- таблица table_catalog создана --
-- CREATE TABLE table_catalog(
--     catalog_id SERIAL PRIMARY KEY,
--     catalog_name VARCHAR(255) UNIQUE
-- );
-- таблица table_product создана --
-- CREATE TABLE table_product(
--     product_id SERIAL PRIMARY KEY,
    
--     product_title VARCHAR(255),
--     product_short VARCHAR(255),
--     product_text TEXT,

--     product_size VARCHAR(255),
--     product_heft INTEGER,
--     product_brand VARCHAR(255),
--     product_color VARCHAR(255),
--     product_count INTEGER,

--     product_price_real INTEGER,
--     product_price_sale INTEGER,

--     product_storage_address VARCHAR(255),

--     to_catalog_id INTEGER REFERENCES table_catalog (catalog_id),

--     product_reg TIMESTAMP
-- );



-- =================================================================== -- 
-- таблица table_rule создана --
-- CREATE TABLE table_rule(
--     rule_id SERIAL PRIMARY KEY NOT NULL,
--     rule_title VARCHAR(255) UNIQUE,

--     rule_del_user BOOLEAN DEFAULT false,
--     rule_del_product BOOLEAN DEFAULT false,
--     rule_del_catalog BOOLEAN DEFAULT false,

--     rule_change_user BOOLEAN DEFAULT false,
--     rule_change_product BOOLEAN DEFAULT false,
--     rule_change_catalog BOOLEAN DEFAULT false,

--     rule_create_user BOOLEAN DEFAULT false,
--     rule_create_product BOOLEAN DEFAULT false,
--     rule_create_catalog BOOLEAN DEFAULT false
-- );

-- таблица table_product создана --
-- CREATE TABLE table_order(
--     order_id SERIAL PRIMARY KEY,
--     to_user_id INTEGER REFERENCES table_user (user_id),

--     to_product_id INTEGER REFERENCES table_product (product_id),
--     order_product_count INTEGER,
--     order_status VARCHAR(10),
--     order_num_operation CHAR(255) UNIQUE,

--     order_time TIMESTAMP
-- );
-- to_catalog_id INTEGER REFERENCES table_catalog (catalog_id),
-- product_size VARCHAR(255),
--     product_heft INTEGER,
--     product_brand VARCHAR(255),
--     product_color VARCHAR(255),
-- ==============================================================================


-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
-- ======================================================================>
CREATE TABLE table_user(
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_firstname VARCHAR(255) DEFAULT 'Finame',
    user_lastname VARCHAR(255) DEFAULT 'Laname',
    user_age DATE NOT NULL DEFAULT CURRENT_DATE,
    user_rule VARCHAR(255) DEFAULT 'admin-1',

    user_history VARCHAR(255),

    user_login VARCHAR(255) UNIQUE,
    user_email VARCHAR(255) UNIQUE,
    user_key VARCHAR(255) UNIQUE NOT NULL default md5(random()::text),
    user_status BOOLEAN DEFAULT false,

    user_password VARCHAR(255),

    user_reg TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
);
-- ======================================================================>
CREATE TABLE table_product(
    product_id SERIAL PRIMARY KEY,
    
    product_declar_number VARCHAR(255) UNIQUE,
    product_title VARCHAR(255),
    product_short VARCHAR(255),
    product_text TEXT,

    product_count INTEGER,
    product_desc VARCHAR(255),
    product_gender VARCHAR(5),
    product_size VARCHAR(255),

    product_price_full INTEGER,
    product_price_short INTEGER,

    product_storage_address VARCHAR(255),

    product_reg TIMESTAMP
);
-- ======================================================================>
-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
-- ======================================================================>
CREATE TABLE table_catalog(
    catalog_id SERIAL PRIMARY KEY,
    catalog_name VARCHAR(255) UNIQUE
);
-- ======================================================================>
CREATE TABLE table_brand(
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR(255) UNIQUE
);
-- ======================================================================>
CREATE TABLE table_tag(
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) UNIQUE
);
-- ======================================================================>
CREATE TABLE table_country(
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(255) UNIQUE
);
-- ======================================================================>
-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
-- ======================================================================>

CREATE TABLE table_join_catalog(
    join_catalog_id SERIAL PRIMARY KEY,
    join_catalog_name VARCHAR(255) ,

    product_id INTEGER REFERENCES table_product (product_id),
    catalog_id INTEGER REFERENCES table_catalog (catalog_id)
);
-- ======================================================================>
CREATE TABLE table_join_tag(
    join_tag_id SERIAL PRIMARY KEY,
    join_tag_name VARCHAR(255) UNIQUE,

    to_product_id INTEGER REFERENCES table_product (product_id),
    to_tag_id INTEGER REFERENCES table_tag (tag_id)
);
-- ======================================================================>
CREATE TABLE table_join_brand(
    join_brand_id SERIAL PRIMARY KEY,
    join_brand_name VARCHAR(255) UNIQUE,

    to_product_id INTEGER REFERENCES table_product (product_id),
    to_brand_id INTEGER REFERENCES table_brand (brand_id)
);
-- ======================================================================>
-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@








