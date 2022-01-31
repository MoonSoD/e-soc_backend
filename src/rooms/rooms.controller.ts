import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Role, Roles } from "../personel/roles/role.decorator";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Role(Roles.ADMIN)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  @Role(Roles.ADMIN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Role(Roles.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
