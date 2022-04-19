# agilify
A test appplication to manage an agile dashboard
```bash
┌─────────┬───────────────────────────┬─────────────────────────────┬────────────────────────────┐
│ (index) │          Pending          │         In Progress         │            Done            │
├─────────┼───────────────────────────┼─────────────────────────────┼────────────────────────────┤
│    0    │ '8a67df63 - Pay bills'    │ '5783c7c3 - Buy a car'      │ '9a2ab02b - Travel'        │
│    1    │            ''             │             ''              │ '25d2b7a2 - Travel morae'  │
└─────────┴───────────────────────────┴─────────────────────────────┴────────────────────────────┘
```


## add-user
Register a new user
```bash
node src/index.js add-user "user1" "user@test.com" "H3L4d3r4"
```

## list-users
Show all the users
```bash
node src/index.js list-users
```

## add-card
Show all the users
```bash
node src/index.js add-card "Task1" "A very easy task" "4951b8d5-ae71-4365-be13-4c5324c10fa7"
```

## move-card-to-pending
Move card to pending list
```bash
node src/index.js move-card-to-pending "ae714365"
```

## move-card-to-in-progress
Move card to in-progress list
```bash
node src/index.js move-card-to-in-progress "ae714365"
```

## move-card-to-done
Move card to done list
```bash
node src/index.js move-card-to-done "ae714365"
```

## show-dashboard
Show the dashboard
```bash
node src/index.js show-dashboard
```

## help
Show the help menu
```bash
node src/index.js --help
```

## version
Show the app version
```bash
node src/index.js --version
```
