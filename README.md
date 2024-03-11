# Identity Reconciliation API

### A robust solution for tracking customer identity across multiple purchases on e-commerce platforms. Built with Typescript, Node JS, Postgresql, this API stores customer contact information (email or phone number) in a relational database table. Seamlessly integrate with your website's checkout events to ensure accurate and efficient identity tracking..

|Deployed Link|
| --- |
|`https://identity-reconciliation-czkm.onrender.com`|

<h3><i>Prerequisites</i></h3>
<ul>
<li>Node.js v14.15.0 or higher</li>
<li>NPM v6.14.8 or higher</li>
</ul>

*steps to locally configure and run this app*


## Clone the repo
```bash

git clone https://github.com/prithidevghosh/Identity-Reconciliation.git


```
## Install the required packages
```bash

npm install

```

## Start the server locally
```bash

npx tsc && node dist/index.js

```


<h3><i>Configuration</i></h3>

<p>The application requires a Postgres db instance to be set up. You can configure the database connection by setting the following environment variables:</p>

```bash

PORT=8002
AWS_RDS_ENDPOINT="your db endpoint"
AWS_RDS_MASTER_USERNAME="your db username"
AWS_RDS_MASTER_PASSWORD="your db password"
AWS_RDS_DB_NAME="your db name"

```
<p>You can set these environment variables in a .env file in the root directory of the application.</p>

<h3><i>API Endpoints</i></h3>


| Endpoint Name | Method | Purpose |
| --- | --- | --- |
| `/api/v1/identify` | POST | User identity reconciliation |


<h3><i>Example prod curl</i></h3>

```bash

curl --location 'https://identity-reconciliation-czkm.onrender.com/api/v1/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "a@email.com",
    "phoneNumber": 123
}'

```
