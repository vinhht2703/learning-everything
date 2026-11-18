#include <functional>
#include <iostream>
#include <list>
#include <string>
#include <utility>
#include <vector>
using namespace std;

// Separate chaining: each bucket is a linked list of (key, value) pairs.
class HashMap {
    vector<list<pair<string, int>>> buckets;
    size_t count = 0;

    list<pair<string, int>>& bucket(const string& key) { return buckets[hash<string>{}(key) % buckets.size()]; }

    void resize() {
        vector<list<pair<string, int>>> old = std::move(buckets);
        buckets.assign(old.size() * 2, {});
        for (auto& b : old)
            for (auto& p : b) bucket(p.first).push_back(p);
    }

public:
    HashMap(size_t capacity = 4) : buckets(capacity) {}

    void put(const string& key, int value) {
        for (auto& p : bucket(key))
            if (p.first == key) { p.second = value; return; }   // existing key: update
        bucket(key).push_back({key, value});
        if (++count > buckets.size() * 3 / 4) resize();          // keep chains short
    }

    int get(const string& key, int fallback = -1) {
        for (auto& p : bucket(key))
            if (p.first == key) return p.second;
        return fallback;
    }

    size_t bucketCount() const { return buckets.size(); }
    size_t size() const { return count; }
};

int main() {
    HashMap m;
    vector<string> fruits = {"apple", "banana", "cherry", "date", "elderberry"};
    for (size_t i = 0; i < fruits.size(); i++) m.put(fruits[i], i);
    m.put("apple", 100);
    cout << m.get("apple") << " " << m.get("date") << " " << m.get("fig") << endl;
    cout << "buckets: " << m.bucketCount() << " items: " << m.size() << endl;
}
