# Virtual DOM

## What is Virtual DOM?

Virtual DOM is a lightweight copy of the real DOM. It is a tree of React elements that represents the UI of the application.

## How does Virtual DOM work?

When the state of the application changes, the Virtual DOM is updated.

The Virtual DOM is then compared to the real DOM, and the changes are applied to the real DOM.

## More details (Phases):

Phase 1: Render

1. Component Render: the components return JSX
2. JSX Transformation: babel converts JSX to `React.createElement()` calls
3. Virtual Tree Creation: create a lightweight JavaScript object representing UI

Phase 2: Reconciliation

4. Diffing Algorithm: compare new Virtual DOM tree with previous snapshot
5. Change Detection: identify exactly which nodes have changed
6. Update Collection: Gathers the minimal set of changes needed

Phase 3: Commit

7. DOM Updates: apply the changes to the real DOM in an optimal way
8. Lifecycle Hooks: calls effects (Eg: call `useLayoutEffect` before `useEffect`)


### About the diffing algorithm:

1. Tree diff strategy: 

- O(n) as time complexity: Uses heuristic algorithm instead of precise diff
- Breadth-first comparison: compare the root nodes first, then the children nodes (level by level)

2. Element type comparison:

- Different types: tear down the old tree and build a new one
- Same types: update the properties

3. List reconciliation:

- Without keys: may re-create entire list on changes
- With keys: matching existing elements by unique identifier

4. Component preservation:

- Same component type: reuses instance (maintains state)
- Different type: unmounts old and mounts new


After React version 16, the diffing algorithm is improved:

`Fiber`: a new reconciliation algorithm

- Incremental rendering: split work into smaller chunks ~
- Priority based updates: allows React to prioritize updates based on user interactions (eg: scheduler: prioritize updates) ~
- Error boundaries: granular error handling ~
