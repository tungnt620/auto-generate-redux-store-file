# Auto clone sub redux store directory
## Assume:
- We have store with structure like:
    1. store
        - subStore1
            1. actions
            2. reducer
        - subStore2
        - ...
- We want to clone subStore1 to new sub store and also replace current name of action, action name

## Usage:
1. ```redux-file-generact```
2. Choose which sub store want to clone
3. Name for it
4. Choose location for it
5. Done
