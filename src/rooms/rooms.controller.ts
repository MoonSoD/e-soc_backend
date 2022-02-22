import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Role, Roles } from "../personel/roles/role.decorator";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    const createdRoom = await this.roomsService.create(createRoomDto);

    return {
      data: createdRoom,
      message: `Created room #${createdRoom.id}`,
    };
  }

  @Get()
  async findAll() {
    const foundRooms = await this.roomsService.findAll();

    return {
      data: foundRooms,
      message: "Fetched all rooms",
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const foundRoom = await this.roomsService.findOne(+id);

    return {
      data: foundRoom,
      message: `Fetched room #${id}`,
    };
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const updatedRoom = await this.roomsService.update(+id, updateRoomDto);

    return {
      data: updatedRoom,
      message: `Updated room #${id}`,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const deletedRoom = await this.roomsService.remove(+id);

    return {
      data: deletedRoom,
      message: `Room #${id} deleted`,
    };
  }
}
