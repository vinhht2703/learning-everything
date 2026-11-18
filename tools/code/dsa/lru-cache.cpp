#include <iostream>
#include <list>
#include <string>
#include <unordered_map>
#include <utility>
using namespace std;

// Hash map (key -> list position) + doubly linked list (most recent at the back).
class LRUCache {
    size_t capacity;
    list<pair<int, string>> order;                                  // std::list is a doubly linked list
    unordered_map<int, list<pair<int, string>>::iterator> map;

public:
    LRUCache(size_t capacity) : capacity(capacity) {}

    string get(int key) {
        auto it = map.find(key);
        if (it == map.end()) return "-1";
        order.splice(order.end(), order, it->second);               // move to the back: most recent
        return it->second->second;
    }

    void put(int key, const string& val) {
        auto it = map.find(key);
        if (it != map.end()) order.erase(it->second);
        order.push_back({key, val});
        map[key] = prev(order.end());
        if (map.size() > capacity) {                                // evict the least recently used
            map.erase(order.front().first);
            order.pop_front();
        }
    }

    void printKeys() {
        for (auto& [k, v] : order) cout << k << " ";
        cout << endl;
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1, "one");
    cache.put(2, "two");
    cout << cache.get(1) << endl;      // 1 is now the most recent
    cache.put(3, "three");             // evicts 2
    cout << cache.get(2) << " " << cache.get(3) << " | keys: ";
    cache.printKeys();
}
