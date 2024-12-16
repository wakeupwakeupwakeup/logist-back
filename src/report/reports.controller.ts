import { Body, Controller, Post } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { Report } from './report.entity';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    async addReport(@Body() report: Partial<Report>) {
        return this.reportsService.addReport(report)
    }
}