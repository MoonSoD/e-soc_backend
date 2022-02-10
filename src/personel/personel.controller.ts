import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PersonelService } from "./personel.service";
import { CreatePersonelDto } from "./dto/create-personel.dto";
import { UpdatePersonelDto } from "./dto/update-personel.dto";
import { Role, Roles } from "./roles/role.decorator";

@Controller("personel")
export class PersonelController {
  constructor(private readonly personelService: PersonelService) {}

  @Post()
  async create(@Body() createPersonelDto: CreatePersonelDto) {
    const createdPersonel = await this.personelService.create(createPersonelDto);

    return {
      data: createdPersonel,
      message: `Created personel #${createdPersonel.id}`,
    };
  }

  @Role(Roles.ADMIN)
  @Get()
  async findAll() {
    const foundPersonel = await this.personelService.findAll();

    return {
      data: foundPersonel,
      message: "Fetched personel members",
    };
  }

  @Role(Roles.ADMIN)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const foundPersonelMember = await this.personelService.findOne(id);

    return {
      data: foundPersonelMember,
    };
  }

  @Role(Roles.ADMIN)
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updatePersonelDto: UpdatePersonelDto) {
    const updatedPersonel = await this.personelService.update(id, updatePersonelDto);

    return {
      data: updatedPersonel,
    };
  }

  @Role(Roles.ADMIN)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedPersonel = await this.personelService.remove(id);

    return {
      data: removedPersonel,
    };
  }
}
