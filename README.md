# Database Management System
## Operations
- Create
- Read
- Delete

## Usage

### 0. Initialize
```
// Import Module
const DataStorage = require('./index');

// Path to store (Optional)
const path = './store/';

// Initialize store with path as an optional parameter
const ds = new DataStorage(path);
```
### 1. Create
```
// Pass the Key and Value in parameters
const key = "info";
const value = {
	firstName:'John',
	lastName:'Doe',
	age: 21,
};
// Key expiry in seconds (Optional)
const timeToLive = 120;

// Add entry to store
ds.create(key, value, timeToLive).then((res) => {
    console.log(res);
})
.catch(err => {
	console.log(err)
});;
```

*Output:*
```
{
	firstName:'John',
	lastName:'Doe',
	age: 21
}
```

### 2. Read
```
// Key to be read from store
const key = "info";

ds.read(key).then(res => {
	console.log(res);
})
.catch(err => {
	console.log(err)
});
```

*Output:*
```
{
	firstName:'John',
	lastName:'Doe',
	age: 21
}
```

### 3. Delete
```
// Key to be deleted from store
const key = "info";

ds.delete(key).then(res => {
	console.log(res);
})
.catch(err => {
	console.log(err)
});;
```

*Output:*
```
{
	status: 200
}
```
