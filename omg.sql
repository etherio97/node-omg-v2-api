-- @block
--
CREATE TABLE users (
    uid VARCHAR(32) PRIMARY KEY NOT NULL,
    name VARCHAR,
    role VARCHAR NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);
-- @block
--
CREATE TABLE categories (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- @block
--
CREATE TABLE products (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    code VARCHAR(16) NOT NULL,
    name VARCHAR NOT NULL,
    price INT NOT NULL,
    description TEXT,
    category UUID REFERENCES categories(id),
    image VARCHAR(500),
    colors JSON,
    min_age INT,
    max_age INT,
    uid VARCHAR(32) NOT NULL REFERENCES users(uid),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);
-- @block
--
INSERT INTO users(uid, name, role)
VALUES ('u3W4Ufb9iyelrML8y10oesw7SNx2', 'Admin', 'admin');
-- @block
--
INSERT INTO categories(id, name)
VALUES (
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        'Clothing'
    ),
    (
        '6845a9fd-38cb-4baf-a460-f19ac87ee1e1',
        'Hat'
    ),
    (
        'd438097b-fb02-4404-b4bb-f1d033360e50',
        'Diapers'
    );
-- @block
--
INSERT INTO products(
        id,
        name,
        code,
        price,
        description,
        image,
        category,
        colors,
        min_age,
        max_age,
        uid
    )
VALUES (
        '58db270d-62f6-48cd-8ca4-9afcb62f9f9a',
        'Jean Jacket',
        'J017',
        3400,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        '86f4026e-d946-4b64-94f7-8220dec07d0a',
        'Jean Jacket',
        'J012',
        5000,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        'c30b7f11-df88-49f9-8d84-93a4c63d99fe',
        'Jean Jacket',
        'J013',
        8000,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        'e425e1fd-ef1e-408e-bb97-8ae190246735',
        'Jean Jacket',
        'J014',
        430,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        'e9fdf45a-706b-4d0c-b9ed-2151d911fb9c',
        'Jean Jacket',
        'J015',
        3400,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        '53028568-bf4a-4091-9069-f834d777c373',
        'Jean Jacket',
        'J016',
        3400,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        '25147ac1-5f54-46b9-9c29-b80d4d5ac8b1',
        'Jean Jacket',
        'J006',
        3400,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        '448cb136-7268-470e-bc75-fdc04007b966',
        'Jean Jacket',
        'J007',
        430,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        '6745936e-0a20-4550-9679-eb3e17fc9534',
        'Jean Jacket',
        'J008',
        430,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    ),
    (
        '674cc5ab-9d21-4fa7-bf5b-7463c5219212',
        'Jean Jacket',
        'J009',
        8000,
        null,
        'https://storage.googleapis.com/omg-baby.appspot.com/0510d368cc877b235e9f985ce9aec069',
        'fe75e3fe-55ad-4377-a669-0989ebb56b28',
        '["pink"]',
        4,
        6,
        'u3W4Ufb9iyelrML8y10oesw7SNx2'
    );
