import { Report } from 'src/report/report.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
    imports: [TypeOrmModule.forFeature([Report])],
    controllers: [ReportsController],
    providers: [ReportsService]
})
export class ReportsModule {}
