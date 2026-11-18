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
