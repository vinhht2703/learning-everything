// Registry: lesson frontmatter `widget: <name>` / `figure: <name>` → component.
import Shapes from './linear/Shapes.astro';
import Vector from './linear/Vector.astro';
import Dot from './linear/Dot.astro';
import Transform from './linear/Transform.astro';
import Compose from './linear/Compose.astro';
import System from './linear/System.astro';
import Eigen from './linear/Eigen.astro';
import Neuron from './linear/Neuron.astro';
import Flow from './iot/Flow.astro';
import Threshold from './iot/Threshold.astro';
import Network from './iot/Network.astro';
import Placement from './iot/Placement.astro';
import Topic from './iot/Topic.astro';
import Security from './iot/Security.astro';
import Monitor from './iot/Monitor.astro';
import Project from './iot/Project.astro';
import Architecture from './iot/Architecture.astro';
import Routine from './fiveam/Routine.astro';
import Empires from './fiveam/Empires.astro';
import Focuses from './fiveam/Focuses.astro';
import Habits from './fiveam/Habits.astro';
import Tactics from './fiveam/Tactics.astro';
import Priorities from './fiveam/Priorities.astro';
import Deepwork from './fiveam/Deepwork.astro';
import Recovery from './fiveam/Recovery.astro';
import Weekly from './fiveam/Weekly.astro';
import Learning from './fiveam/Learning.astro';
import Plan from './fiveam/Plan.astro';
import Growth from './bigo/Growth.astro';
import Complexity from './bigo/Complexity.astro';
import Simulator from './bigo/Simulator.astro';
import Rules from './bigo/Rules.astro';
import Quiz from './bigo/Quiz.astro';
import Ram from './dsa/Ram.astro';
import StaticArray from './dsa/StaticArray.astro';
import DynamicArray from './dsa/DynamicArray.astro';
import Stack from './dsa/Stack.astro';
import SinglyList from './dsa/SinglyList.astro';
import DoublyList from './dsa/DoublyList.astro';
import Queue from './dsa/Queue.astro';
import CallStack from './dsa/CallStack.astro';
import FibTree from './dsa/FibTree.astro';
import SortInsertion from './dsa/SortInsertion.astro';
import SortMerge from './dsa/SortMerge.astro';
import SortQuick from './dsa/SortQuick.astro';
import SortBucket from './dsa/SortBucket.astro';
import BinarySearchWidget from './dsa/BinarySearch.astro';
import GuessNumber from './dsa/GuessNumber.astro';
import TreeAnatomy from './dsa/TreeAnatomy.astro';
import BstSearch from './dsa/BstSearch.astro';
import BstEdit from './dsa/BstEdit.astro';
import TreeDfs from './dsa/TreeDfs.astro';
import TreeBfs from './dsa/TreeBfs.astro';
import BstMap from './dsa/BstMap.astro';
import TreeMaze from './dsa/TreeMaze.astro';
import HeapView from './dsa/HeapView.astro';
import HeapPushPop from './dsa/HeapPushPop.astro';
import Heapify from './dsa/Heapify.astro';
import HashCounter from './dsa/HashCounter.astro';
import HashBuckets from './dsa/HashBuckets.astro';
import GraphReps from './dsa/GraphReps.astro';
import GridDfs from './dsa/GridDfs.astro';
import GridBfs from './dsa/GridBfs.astro';
import GraphBfs from './dsa/GraphBfs.astro';
import DpStairs from './dsa/DpStairs.astro';
import DpGrid from './dsa/DpGrid.astro';
import BitPlayground from './dsa/BitPlayground.astro';
import LruSim from './dsa/LruSim.astro';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = (props: any) => any;

export const widgets: Record<string, AnyComponent> = {
  // linear algebra
  shapes: Shapes, vector: Vector, dot: Dot, transform: Transform, compose: Compose, system: System, eigen: Eigen, neuron: Neuron,
  // IoT
  flow: Flow, threshold: Threshold, network: Network, placement: Placement, topic: Topic, security: Security, monitor: Monitor, project: Project,
  // 5 AM Club
  routine: Routine, empires: Empires, focuses: Focuses, habits: Habits, tactics: Tactics, priorities: Priorities, deepwork: Deepwork, recovery: Recovery, weekly: Weekly, learning: Learning, plan: Plan,
  // Big O
  growth: Growth, complexity: Complexity, simulator: Simulator, rules: Rules, quiz: Quiz,
  // Data structures & algorithms
  ram: Ram, 'static-array': StaticArray, 'dynamic-array': DynamicArray, stack: Stack,
  'singly-list': SinglyList, 'doubly-list': DoublyList, queue: Queue, 'call-stack': CallStack, 'fib-tree': FibTree,
  'sort-insertion': SortInsertion, 'sort-merge': SortMerge, 'sort-quick': SortQuick, 'sort-bucket': SortBucket,
  'binary-search': BinarySearchWidget, 'guess-number': GuessNumber,
  'tree-anatomy': TreeAnatomy, 'bst-search': BstSearch, 'bst-edit': BstEdit, 'tree-dfs': TreeDfs, 'tree-bfs': TreeBfs, 'bst-map': BstMap,
  'tree-maze': TreeMaze,
  'heap-view': HeapView, 'heap-push-pop': HeapPushPop, heapify: Heapify,
  'hash-counter': HashCounter, 'hash-buckets': HashBuckets,
  'graph-reps': GraphReps, 'grid-dfs': GridDfs, 'grid-bfs': GridBfs, 'graph-bfs': GraphBfs,
  'dp-stairs': DpStairs, 'dp-grid': DpGrid, 'bit-playground': BitPlayground, 'lru-sim': LruSim,
};

export const figures: Record<string, AnyComponent> = {
  'iot-architecture': Architecture,
};
