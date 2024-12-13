import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Get()
    async findAll() {
        return this.clientsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.findOne(id);
    }

    // @Post('create')
    // async create(@Body() client: Partial<Client>) {
    //     return this.clientsService.create(client);
    // }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadClients(@UploadedFile() file: Express.Multer.File) {
        return this.clientsService.upload(file);
    }
}
