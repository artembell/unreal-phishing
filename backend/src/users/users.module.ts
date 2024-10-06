import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PersistenceModule } from 'src/persistence/persistence.module';

@Module({
    imports: [PersistenceModule],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }
