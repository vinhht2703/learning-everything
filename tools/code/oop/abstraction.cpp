#include <iostream>
#include <string>
#include <vector>
using namespace std;

class ReportExporter {
public:
    string exportRows(const vector<string>& rows) {
        string report = format(rows);
        save(report);
        return "Export complete";
    }

private:
    string format(const vector<string>& rows) {
        string out;
        for (size_t i = 0; i < rows.size(); i++) {
            if (i > 0) out += "\n";
            out += rows[i];
        }
        return out;
    }

    void save(const string& report) {
        cout << "Saved " << report.size() << " characters" << endl;
    }
};

int main() {
    ReportExporter exporter;
    cout << exporter.exportRows({"Q1", "Q2"}) << endl;
}
