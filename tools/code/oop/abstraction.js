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
