---
id: abstraction
section: NGUYÊN LÝ CỐT LÕI
title: Tính trừu tượng
summary: Ẩn chi tiết triển khai
duration: 6 phút
description: Cung cấp thao tác mà bên gọi cần, đồng thời giữ các bước nội bộ phía sau giao diện.
goal: Dùng export() mà không cần tự quản lý các bước định dạng và lưu trữ.
takeaways:
  - label: API công khai
    text: Nơi gọi dùng export(rows).
  - label: Các bước ẩn
    text: Việc định dạng và lưu vẫn nằm bên trong lớp.
  - label: Thay đổi an toàn
    text: Các bước bên trong có thể thay đổi mà không ảnh hưởng nơi gọi.
code:
  file: exporter.py
  lang: python
  source: |-
    class ReportExporter:
        def export(self, rows):
            report = self._format(rows)
            self._save(report)
            return "Export complete"

        def _format(self, rows):
            return "\n".join(rows)

        def _save(self, report):
            print(f"Saved {len(report)} characters")

    exporter = ReportExporter()
    print(exporter.export(["Q1", "Q2"]))
  output: |-
    Saved 5 characters
    Export complete
  variants:
    - lang: javascript
      file: exporter.js
      source: |-
        class ReportExporter {
          export(rows) {
            const report = this.#format(rows);
            this.#save(report);
            return "Export complete";
          }

          #format(rows) {
            return rows.join("\n");
          }

          #save(report) {
            console.log(`Saved ${report.length} characters`);
          }
        }

        const exporter = new ReportExporter();
        console.log(exporter.export(["Q1", "Q2"]));
      output: |-
        Saved 5 characters
        Export complete
    - lang: cpp
      file: exporter.cpp
      source: |-
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
      output: |-
        Saved 5 characters
        Export complete
order: 6
---
