# json-to-rel

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1982b37edf4d44a0be92a2ffd304115b)](https://www.codacy.com/app/tomaszgil_2/json-to-rel?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tomaszgil/json-to-rel&amp;utm_campaign=Badge_Grade)

> Transform JSON data object to relational form (sql or csv)

This package allows you to transform valid json object to relational form. The output of the application can be in a form of one `.sql` file with `create table` statements or a set of `.csv` files, with file names corresponding to table names.

## Install

Using npm:

```sh
npm install --global json-to-rel
```

or using yarn:

```sh
yarn global add json-to-rel
```

## Usage

Run the scipt using the command line

```sh
json-to-rel -i input-file.json -m sql -o output-dir/
```

### Flags

| Setting | Description | Short flag | Full flag | Values |
|---|---|---|---|---|
| **Input file** | Path to a file with input JSON object | -i | --input | path/to/file.json |
| **Output directory** | Path to a directory in which the application will store files with the results of the processing | -o | --output | path/to/direcory/ |
| **Mode** | Type of data and files that will be generated | -m | --mode | sql \| csv |
| **Logging** | Activating optional logging to a file with log’s level of detail (the higher the value, the more detailed the log messages) | -l | --logging | 0 \| 1 \| 2 |
| **Configuration file** | Path to file with additional configuration JSON object | -c | --config | path/to/file.json |

### Ouput
1.  **SQL**
    
    A `.sql` file with a set of `create table` statements representing relational tables mapped from json object. Each table featutes a surrogate primary key. Tables are connected with foreign key constraints. Syntax is compliant with `Sqlite 3`.

1.  **CSV**

    A set of `.csv` files with file names corresponding to table names. Each file contains a header with table column names and rows which correspond to table records with values from input json object.

### Configuration file

You can pass your own configuration file, which will override default configuration. Your configuration file can look like this.
```javascript
{
  "inputFileEncoding": "utf8",
  "outputFileName": "tables.sql",
  "rootTableName": "GENERATED",
  "surrogatePrimaryKeyName": "__ID",
  "logFile": "json2rel.log",
  "csvDelimiters": {
    "col": ";",
    "row": "\n"
  },
  "generatedAttributeName": "value",
  "truncateTableName": false
}
```

### More information

You can find detailed information using help.
```sh
json-to-rel --help
```

## Contributions

Feel free to fork this github repository to find ways to improve this package.

### Development
1.  Install dependencies
    ```sh
    npm install
    ```

2.  Run script
    ```sh
    npm start
    ```

    If you want to pass arguments to the script please use the following command with full parameter flags like so:
    ```sh
    npm start -- --input /path/to/input --mode sql --output /path/to/output
    ```
  
### Building and testing
1.  Simulate package installation with `npm link`.
2.  Run the program with `json-to-rel` command followed by arguments.
3.  Remove package with `npm unlink`.
