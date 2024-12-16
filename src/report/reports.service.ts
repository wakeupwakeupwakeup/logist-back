import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Report } from "./report.entity";

@Injectable()
export class ReportsService {
    constructor(private dataSource: DataSource) {}

    async addReport(report: Partial<Report>) {
        return this.dataSource.transaction(async (manager) => {
            const newReport = manager.create(Report, report);
            return await manager.save(newReport);
        })
    }
}